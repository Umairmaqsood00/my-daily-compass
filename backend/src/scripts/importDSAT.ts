import "../config/env";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { connectDB } from "../config/db";
import QuestionCategory from "../models/QuestionCategory";
import Question from "../models/Question";
import SATTest from "../models/SATTest";
import DiagnosticTest from "../models/DiagnosticTest";

interface ParsedQuestion {
  questionNumber: number;
  skill: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  text: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  isFreeResponse: boolean;
}

interface ParsedModule {
  name: string;
  section: "READING_WRITING" | "MATH";
  moduleType: "MOD1" | "MOD2_EASY" | "MOD2_HARD";
  questions: ParsedQuestion[];
}

function parseQuestionsFile(filePath: string): ParsedModule[] {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n").map(l => l.replace(/\r/g, "").trim());

  const modules: ParsedModule[] = [];
  let currentSection: "READING_WRITING" | "MATH" | null = null;
  let currentModuleType: "MOD1" | "MOD2_EASY" | "MOD2_HARD" | null = null;
  let currentModuleName = "";
  let currentModuleQuestions: ParsedQuestion[] = [];

  let currentQuestion: ParsedQuestion | null = null;
  let questionTextLines: string[] = [];
  let collectingOptions = false;
  let lastOption: ParsedQuestion["options"][number] | null = null;

  const flushQuestion = () => {
    if (currentQuestion) {
      if (questionTextLines.length > 0) {
        currentQuestion.text = questionTextLines.join("\n").trim();
      }
      // If there are no options, treat as free response
      if (currentQuestion.options.length === 0) {
        currentQuestion.isFreeResponse = true;
      }
      currentModuleQuestions.push(currentQuestion);
    }
    currentQuestion = null;
    questionTextLines = [];
    collectingOptions = false;
    lastOption = null;
  };

  const flushModule = () => {
    flushQuestion();
    if (currentSection && currentModuleType && currentModuleQuestions.length > 0) {
      modules.push({
        name: currentModuleName,
        section: currentSection,
        moduleType: currentModuleType,
        questions: currentModuleQuestions,
      });
    }
    currentModuleQuestions = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    if (line.toLowerCase().startsWith("answer:")) {
      continue;
    }

    // Check for Section headers (supporting separate or combined format, e.g., "Section 1: Reading & Writing — Module 1" or "Section 1 — Module 1")
    const isSec1 = /^Section\s*1\b/i.test(line);
    const isSec2 = /^Section\s*2\b/i.test(line);

    if (isSec1 || isSec2) {
      flushModule();
      currentSection = isSec1 ? "READING_WRITING" : "MATH";

      // If module type is combined on the section line
      if (/Module 1|Mod 1/i.test(line)) {
        currentModuleType = "MOD1";
        currentModuleName = currentSection === "READING_WRITING" ? "Reading & Writing Module 1" : "Math Module 1";
      } else if (/Module 2/i.test(line) && /Easier|Easy/i.test(line)) {
        currentModuleType = "MOD2_EASY";
        currentModuleName = currentSection === "READING_WRITING" ? "Reading & Writing Module 2 - Easier" : "Math Module 2 - Easier";
      } else if (/Module 2/i.test(line) && /Harder|Hard/i.test(line)) {
        currentModuleType = "MOD2_HARD";
        currentModuleName = currentSection === "READING_WRITING" ? "Reading & Writing Module 2 - Harder" : "Math Module 2 - Harder";
      }
      continue;
    }

    // Check for separate Module headers
    if (currentSection) {
      const isMod1 = /^Module\s*1\b/i.test(line) && !/Module\s*2/i.test(line);
      const isMod2Easy = /^Module\s*2\b/i.test(line) && /Easier|Easy/i.test(line);
      const isMod2Hard = /^Module\s*2\b/i.test(line) && /Harder|Hard/i.test(line);

      if (isMod1) {
        flushModule();
        currentModuleType = "MOD1";
        currentModuleName = currentSection === "READING_WRITING" ? "Reading & Writing Module 1" : "Math Module 1";
        continue;
      }
      if (isMod2Easy) {
        flushModule();
        currentModuleType = "MOD2_EASY";
        currentModuleName = currentSection === "READING_WRITING" ? "Reading & Writing Module 2 - Easier" : "Math Module 2 - Easier";
        continue;
      }
      if (isMod2Hard) {
        flushModule();
        currentModuleType = "MOD2_HARD";
        currentModuleName = currentSection === "READING_WRITING" ? "Reading & Writing Module 2 - Harder" : "Math Module 2 - Harder";
        continue;
      }
    }

    // Skip helper page markers, separator lines, and grid-in instructions
    if (/^--\s*\d+\s*of\s*\d+\s*--$/i.test(line)) continue;
    if (/^Total:\s*\d+\s*Questions/i.test(line)) continue;
    if (/^Approximately\s*\d+%/i.test(line)) continue;
    if (/^\(Student-produced response\s*—\s*grid-in\)/i.test(line)) continue;
    if (line.startsWith("These questions are 100% original")) continue;
    if (line.startsWith("ADAPTIVE DIGITAL SAT")) continue;
    if (line.startsWith("DSAT_Dec_2024")) continue;

    // Check for Question start
    const qMatch = line.match(/^Question\s+(\d+)\s*$/i);
    if (qMatch) {
      flushQuestion();
      currentQuestion = {
        questionNumber: parseInt(qMatch[1], 10),
        skill: "",
        difficulty: "MEDIUM",
        text: "",
        options: [],
        correctAnswer: "",
        explanation: "",
        isFreeResponse: false,
      };
      // Look at next line for Skill & Difficulty
      const nextLine = lines[i + 1] ? lines[i + 1].trim() : "";
      const skillMatch = nextLine.match(/^Skill:\s*(.*?)\s*\|\s*Difficulty:\s*(EASY|MEDIUM|HARD)/i);
      if (skillMatch) {
        currentQuestion.skill = skillMatch[1].trim();
        currentQuestion.difficulty = skillMatch[2].toUpperCase() as "EASY" | "MEDIUM" | "HARD";
        i++; // skip next line
      }
      continue;
    }

    if (!currentQuestion) continue;

    // Check for Option A) B) C) D)
    const optMatch = line.match(/^([A-D])\)\s*(.*)/);
    if (optMatch) {
      if (questionTextLines.length > 0) {
        currentQuestion.text = questionTextLines.join("\n").trim();
        questionTextLines = [];
      }
      collectingOptions = true;
      const opt = {
        label: optMatch[1],
        text: optMatch[2].trim(),
      };
      currentQuestion.options.push(opt);
      lastOption = opt;
      continue;
    }

    if (collectingOptions && lastOption) {
      lastOption.text = `${lastOption.text} ${line}`.trim();
      continue;
    }

    // Otherwise, append to question text
    questionTextLines.push(line);
  }

  flushModule();
  return modules;
}

interface ParsedSolution {
  questionNumber: number;
  answer: string;
  explanation: string;
}

interface ParsedSolModule {
  section: "READING_WRITING" | "MATH";
  moduleType: "MOD1" | "MOD2_EASY" | "MOD2_HARD";
  solutions: ParsedSolution[];
}

function parseSolutionsFile(filePath: string): ParsedSolModule[] {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n").map(l => l.replace(/\r/g, "").trim());

  const solModules: ParsedSolModule[] = [];
  let currentSection: "READING_WRITING" | "MATH" | null = null;
  let currentModuleType: "MOD1" | "MOD2_EASY" | "MOD2_HARD" | null = null;
  let currentSolList: ParsedSolution[] = [];

  let currentSol: ParsedSolution | null = null;
  let explLines: string[] = [];
  let waitingForAnswer = false;

  const flushSol = () => {
    if (currentSol) {
      currentSol.explanation = explLines.join("\n").trim();
      currentSolList.push(currentSol);
    }
    currentSol = null;
    explLines = [];
  };

  const flushSolModule = () => {
    flushSol();
    waitingForAnswer = false;
    if (currentSection && currentModuleType && currentSolList.length > 0) {
      solModules.push({
        section: currentSection,
        moduleType: currentModuleType,
        solutions: currentSolList,
      });
    }
    currentSolList = [];
  };

  const cleanAnswer = (rawAns: string, section: string, moduleType: string, qNum: number): string => {
    let ans = rawAns.trim();
    // Strip "Answer:" or "Grid-in:" prefix if present
    ans = ans.replace(/^(Answer|Grid-in):\s*/i, "").trim();
    
    // Extract A, B, C, D if it's multiple choice
    const optMatch = ans.match(/^([A-D])(?:\s+|\)|\]|\b)/i);
    if (optMatch) {
      return optMatch[1].toUpperCase();
    }
    
    // Strip "See note" math patches
    if (ans.toLowerCase().startsWith("see note")) {
      if (section === "MATH" && moduleType === "MOD1" && qNum === 18) {
        return "3111"; // DSAT1 patch
      }
      if (section === "MATH" && moduleType === "MOD2_EASY" && qNum === 19) {
        return "44"; // DSAT1 patch
      }
      return "See note";
    }

    // Clean symbols like ≈ and spaces
    return ans.replace(/[≈\s]/g, "");
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    // Check for Section headers (supporting separate or combined format, e.g., "Section 1: Reading & Writing — Module 1" or "Section 1 — Module 1")
    const isSec1 = /^Section\s*1\b/i.test(line);
    const isSec2 = /^Section\s*2\b/i.test(line);

    if (isSec1 || isSec2) {
      flushSolModule();
      currentSection = isSec1 ? "READING_WRITING" : "MATH";
      if (/Module 1|Mod 1/i.test(line)) currentModuleType = "MOD1";
      else if (/Module 2/i.test(line) && /Easier|Easy/i.test(line)) currentModuleType = "MOD2_EASY";
      else if (/Module 2/i.test(line) && /Harder|Hard/i.test(line)) currentModuleType = "MOD2_HARD";
      continue;
    }

    if (currentSection) {
      const isMod1 = /^Module\s*1\b/i.test(line) && !/Module\s*2/i.test(line);
      const isMod2Easy = /^Module\s*2\b/i.test(line) && /Easier|Easy/i.test(line);
      const isMod2Hard = /^Module\s*2\b/i.test(line) && /Harder|Hard/i.test(line);
      if (isMod1 || isMod2Easy || isMod2Hard) {
        flushSolModule();
        if (isMod1) currentModuleType = "MOD1";
        else if (isMod2Easy) currentModuleType = "MOD2_EASY";
        else currentModuleType = "MOD2_HARD";
        continue;
      }
    }

    // Format 1: Question 1 — Answer: C
    let qMatch = line.match(/^Question\s+(\d+)\s*—\s*(.*)/i);
    if (qMatch) {
      flushSol();
      const questionNumber = parseInt(qMatch[1], 10);
      const rest = qMatch[2].trim();
      const answer = cleanAnswer(rest, currentSection || "", currentModuleType || "", questionNumber);

      currentSol = {
        questionNumber,
        answer,
        explanation: "",
      };
      
      const answerPrefix = rest.match(/^(Answer|Grid-in):\s*[A-D0-9]/i) || rest.match(/^[A-D0-9]/i);
      if (answerPrefix) {
        const firstExpl = rest.substring(answerPrefix[0].length).trim();
        if (firstExpl) explLines.push(firstExpl);
      }
      continue;
    }

    // Format 2: Question 1
    qMatch = line.match(/^Question\s+(\d+)\s*$/i);
    if (qMatch) {
      flushSol();
      const questionNumber = parseInt(qMatch[1], 10);
      currentSol = {
        questionNumber,
        answer: "",
        explanation: "",
      };
      waitingForAnswer = true;
      continue;
    }

    if (waitingForAnswer && currentSol && line.toLowerCase().startsWith("answer:")) {
      currentSol.answer = cleanAnswer(line, currentSection || "", currentModuleType || "", currentSol.questionNumber);
      waitingForAnswer = false;
      continue;
    }

    // Format 3: Q1. Answer: A) detect
    qMatch = line.match(/^Q(\d+)\.\s*(.*)/i);
    if (qMatch) {
      flushSol();
      const questionNumber = parseInt(qMatch[1], 10);
      const rest = qMatch[2].trim();
      const answer = cleanAnswer(rest, currentSection || "", currentModuleType || "", questionNumber);

      currentSol = {
        questionNumber,
        answer,
        explanation: "",
      };

      const answerPrefix = rest.match(/^(Answer|Grid-in):\s*[A-D]/i) || rest.match(/^[A-D]\)?\s*/i);
      if (answerPrefix) {
        const firstExpl = rest.substring(answerPrefix[0].length).trim();
        if (firstExpl) explLines.push(firstExpl);
      }
      continue;
    }

    if (/^Quick-Reference\s*Answer\s*Grid/i.test(line)) {
      flushSolModule();
      currentSection = null;
      currentModuleType = null;
      continue;
    }

    if (currentSol) {
      explLines.push(line);
    }
  }

  flushSolModule();
  return solModules;
}

function classifyCategory(skill: string, section: "READING_WRITING" | "MATH"): string {
  const s = skill.toLowerCase();
  if (section === "READING_WRITING") {
    if (s.includes("vocabulary") || s.includes("fill-in")) return "SAT Vocabulary";
    if (s.includes("grammar") || s.includes("convention") || s.includes("sentence") || s.includes("punctuation") || s.includes("transition")) return "SAT Grammar & Writing";
    return "SAT Reading Comprehension";
  }
  if (s.includes("geometry") || s.includes("triangle") || s.includes("circle") || s.includes("angle") || s.includes("area") || s.includes("volume") || s.includes("perimeter")) return "SAT Geometry";
  if (s.includes("data") || s.includes("statistic") || s.includes("probability") || s.includes("scatter") || s.includes("table") || s.includes("graph") || s.includes("percent")) return "SAT Data & Statistics";
  if (s.includes("quadratic") || s.includes("polynomial") || s.includes("exponential") || s.includes("function") || s.includes("nonlinear") || s.includes("radical") || s.includes("exponent")) return "SAT Advanced Math";
  return "SAT Algebra";
}

async function ensureCategories(): Promise<Map<string, mongoose.Types.ObjectId>> {
  const categories = [
    { name: "SAT Reading Comprehension", section: "READING_WRITING" as const, description: "Reading passages and comprehension" },
    { name: "SAT Grammar & Writing", section: "READING_WRITING" as const, description: "Grammar, usage, and rhetoric" },
    { name: "SAT Vocabulary", section: "READING_WRITING" as const, description: "Vocabulary in context" },
    { name: "SAT Algebra", section: "MATH" as const, description: "Linear equations, inequalities, systems" },
    { name: "SAT Advanced Math", section: "MATH" as const, description: "Quadratics, polynomials, exponentials" },
    { name: "SAT Geometry", section: "MATH" as const, description: "Geometry and trigonometry" },
    { name: "SAT Data & Statistics", section: "MATH" as const, description: "Data analysis, probability, statistics" },
  ];

  for (const cat of categories) {
    await QuestionCategory.updateOne(
      { name: cat.name },
      { $set: cat },
      { upsert: true }
    );
  }

  const all = await QuestionCategory.find({ name: { $regex: /^SAT / } });
  return new Map(all.map((c) => [c.name, c._id as mongoose.Types.ObjectId]));
}

async function main() {
  const connected = await connectDB();
  if (!connected) throw new Error("Database connection failed");

  console.log("-----------------------------------------");
  console.log("1. CLEARING PREVIOUS NON-ADAPTIVE SAT DATA");
  console.log("-----------------------------------------");
  
  // Clear previous questions from SAT source
  const deletedQuestions = await Question.deleteMany({ source: "SAT" });
  console.log(`Deleted ${deletedQuestions.deletedCount} legacy SAT questions.`);

  // Clear previous SAT mock tests
  const deletedTests = await SATTest.deleteMany({});
  console.log(`Deleted ${deletedTests.deletedCount} legacy SAT tests.`);

  // Clear previous SAT diagnostic tests
  const deletedDiagnostics = await DiagnosticTest.deleteMany({ title: /SAT Practice Test/i });
  console.log(`Deleted ${deletedDiagnostics.deletedCount} legacy SAT diagnostic tests.`);

  const digitalsatpapersDir = path.resolve(__dirname, "../../../digitalsatpapers");
  
  // Ensure categories exist
  const categoryMap = await ensureCategories();

  const uploadsDir = path.resolve(__dirname, "../../uploads/sat");
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  for (let tNum = 1; tNum <= 6; tNum++) {
    console.log(`\n=========================================`);
    console.log(`PROCESSING DSAT TEST #${tNum}`);
    console.log(`=========================================`);

    let questionsPath = path.join(digitalsatpapersDir, `DSAT${tNum}_text.txt`);
    let solutionsPath = path.join(digitalsatpapersDir, `DSAT${tNum}sol_text.txt`);

    if (!fs.existsSync(questionsPath) || !fs.existsSync(solutionsPath)) {
      console.warn(`DSAT${tNum} questions or solutions text file not found, skipping.`);
      continue;
    }

    // Auto-detect and swap if files are named/swapped incorrectly
    const fileAContent = fs.readFileSync(questionsPath, "utf-8");
    const first120 = fileAContent.substring(0, 120).toUpperCase();
    if (first120.includes("ANSWER KEY") || first120.includes("SOLUTIONS")) {
      console.log(`[Self-Healing] Swapped file detected for DSAT${tNum}. Correcting...`);
      const temp = questionsPath;
      questionsPath = solutionsPath;
      solutionsPath = temp;
    }

    const parsedModules = parseQuestionsFile(questionsPath);
    const parsedSolModules = parseSolutionsFile(solutionsPath);

    console.log(`Parsed ${parsedModules.length} modules from questions file.`);
    console.log(`Parsed ${parsedSolModules.length} modules from solutions file.`);

    // Build solutions lookup map: section-moduleType-qNum -> solution
    const solMap = new Map<string, ParsedSolution>();
    for (const solMod of parsedSolModules) {
      for (const sol of solMod.solutions) {
        const key = `${solMod.section}-${solMod.moduleType}-${sol.questionNumber}`;
        solMap.set(key, sol);
      }
    }

    const orderedModuleKeys: { section: "READING_WRITING" | "MATH"; moduleType: "MOD1" | "MOD2_EASY" | "MOD2_HARD"; name: string }[] = [
      { section: "READING_WRITING", moduleType: "MOD1", name: "Reading & Writing Module 1" },
      { section: "READING_WRITING", moduleType: "MOD2_EASY", name: "Reading & Writing Module 2 - Easier" },
      { section: "READING_WRITING", moduleType: "MOD2_HARD", name: "Reading & Writing Module 2 - Harder" },
      { section: "MATH", moduleType: "MOD1", name: "Math Module 1" },
      { section: "MATH", moduleType: "MOD2_EASY", name: "Math Module 2 - Easier" },
      { section: "MATH", moduleType: "MOD2_HARD", name: "Math Module 2 - Harder" }
    ];

    const satModules = [];

    for (let idx = 0; idx < orderedModuleKeys.length; idx++) {
      const keyConfig = orderedModuleKeys[idx];
      
      // Find the parsed module
      const parsedMod = parsedModules.find(m => m.section === keyConfig.section && m.moduleType === keyConfig.moduleType);
      if (!parsedMod) {
        throw new Error(`Could not find parsed module for ${keyConfig.name}`);
      }

      const questionIds: mongoose.Types.ObjectId[] = [];
      console.log(`Processing ${keyConfig.name} (${parsedMod.questions.length} questions)...`);

      for (const q of parsedMod.questions) {
        const solKey = `${keyConfig.section}-${keyConfig.moduleType}-${q.questionNumber}`;
        const sol = solMap.get(solKey);
        if (!sol) {
          throw new Error(`No solution found for question ${q.questionNumber} in ${keyConfig.name}`);
        }

        const catName = classifyCategory(q.skill, keyConfig.section);
        const categoryId = categoryMap.get(catName);
        if (!categoryId) {
          throw new Error(`Category not found: ${catName}`);
        }

        const uniqueTag = `dsat-${tNum}-m${idx}-q${q.questionNumber}`;
        
        const doc = await Question.create({
          text: q.text,
          options: q.options,
          correctAnswer: sol.answer,
          explanation: sol.explanation,
          category: categoryId,
          difficulty: q.difficulty,
          section: keyConfig.section,
          tags: [uniqueTag, `dsat-${tNum}`, `dsat-${tNum}-m${idx}`, q.skill],
          source: "SAT",
          status: "PUBLISHED"
        });

        questionIds.push(doc._id as mongoose.Types.ObjectId);
      }

      satModules.push({
        name: keyConfig.name,
        section: keyConfig.section,
        moduleNumber: idx + 1, // index-based module number
        questions: questionIds,
        timeLimitMinutes: keyConfig.section === "READING_WRITING" ? 32 : 35
      });
    }

    // Copy PDF to uploads
    const pdfSource = path.resolve(digitalsatpapersDir, `DSAT${tNum}.pdf`);
    let pdfUrl = "";
    if (fs.existsSync(pdfSource)) {
      const pdfDest = path.join(uploadsDir, `DSAT${tNum}.pdf`);
      fs.copyFileSync(pdfSource, pdfDest);
      pdfUrl = `/uploads/sat/DSAT${tNum}.pdf`;
      console.log(`PDF copied to uploads: ${pdfDest}`);
    }

    const test = await SATTest.create({
      title: `Digital SAT Practice Test ${tNum}`,
      description: `Adaptive Digital SAT practice test #${tNum}. Includes full module routing based on your performance.`,
      year: 2025,
      testNumber: tNum,
      isAdaptive: true,
      modules: satModules,
      breakDurationMinutes: 10,
      isActive: true,
      accessLevel: "FREE",
      pdfUrl
    });

    console.log(`Created SAT Test: ${test.title}`);
  }

  console.log("Import completed successfully!");
}

main()
  .catch((e) => {
    console.error("Import failed:", e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
