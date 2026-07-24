import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { useAuth } from "../hooks/useAuth";
import { Icon } from "../components/common/Icon";
import { ContactForm } from "../components/common/ContactForm";

export const Route = createFileRoute("/sat")({
  component: SATPrepPage,
});

function useRegion() {
  const [region, setRegion] = useState("loading");

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const isPK = tz === "Asia/Karachi";
      setRegion(isPK ? "pk" : "intl");
    } catch {
      setRegion("intl");
    }
  }, []);

  return region;
}

const PRICING = {
  pk: {
    rw: { amount: "Rs 20,000", period: "/ module" },
    math: { amount: "Rs 20,000", period: "/ module" },
    bundle: { amount: "Rs 35,000", period: "/ full course" },
  },
  intl: {
    rw: { amount: "$200", period: "/ module" },
    math: { amount: "$200", period: "/ module" },
    bundle: { amount: "$350", period: "/ full course" },
  },
};

const CheckIcon = ({ color = "#3B7DD8" }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-0.5">
    <circle cx="10" cy="10" r="10" fill={color} opacity="0.12" />
    <path d="M6 10.5L8.5 13L14 7.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-0.5">
    <circle cx="10" cy="10" r="10" fill="#F4B300" opacity="0.12" />
    <path d="M10 3.5l2 4 4.5.5-3.25 3 1 4.5-4.25-2.25-4.25 2.25 1-4.5-3.25-3 4.5-.5 2-4z" fill="#F4B300" />
  </svg>
);

interface PriceBadgeProps {
  amount: string;
  period: string;
  accent: string;
}

function PriceBadge({ amount, period, accent }: PriceBadgeProps) {
  const isGold = accent === "gold";
  return (
    <div className={`inline-flex items-baseline gap-1 rounded-xl px-4 py-2 border ${
      isGold ? "bg-accent/10 border-accent/25" : "bg-secondary/10 border-secondary/25"
    }`}>
      <span className={`text-2xl font-extrabold tracking-tight ${
        isGold ? "text-[#D4911E]" : "text-secondary"
      }`}>{amount}</span>
      <span className={`text-sm font-semibold ${isGold ? "text-[#B07A15]" : "text-secondary/80"
        }`}>{period}</span>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="inline-block w-40 h-[38px] rounded-xl bg-surface-container-high animate-pulse" />
  );
}

function SATPrepPage() {
  const { user } = useAuth();
  const region = useRegion();

  const prices = region === "loading" ? null : PRICING[region as keyof typeof PRICING];

  const getWhatsAppLink = (planName: string) => {
    const emailStr = user ? ` (Registered Email: ${user.email})` : "";
    const text = `Hi SAT Sharks! I want to enroll in the ${planName} of the SAT prep.${emailStr} Please guide me on the next steps.`;
    return `https://wa.me/923164514334?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-surface-container-low min-h-screen font-body text-on-surface">
          {/* Hero */}
          <div className="bg-gradient-to-br from-[#0B1929] via-[#162D4D] to-[#1A3558] py-16 px-6 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 rounded-full px-4 py-1.5 mb-6">
                <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">Pricing & Modules</span>
              </div>
              <h1 className="font-display text-4xl font-extrabold text-white leading-tight mb-4 tracking-tight md:text-5xl">
                Structured Prep.<br />
                <span className="text-[#5BA3F5]">Flexible Modules.</span>
              </h1>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
                Select specific modules to target your weak areas or enroll in our complete bundle for full syllabus mastery. All paths feature live online sessions, Desmos training, and actual past papers.
              </p>
            </div>
          </div>

          {/* Stat strip */}
          <div className="bg-[#0F1B2D] border-b border-[#3B7DD8]/15">
            <div className="max-w-3xl mx-auto flex justify-center gap-8 md:gap-16 py-5 px-6">
              {[
                ["6", "Live Classes / Week"],
                ["8+", "Past Papers Offered"],
                ["100%", "Desmos Guided Study"],
              ].map(([num, label], i) => (
                <div key={i} className="text-center">
                  <div className="font-body text-2xl md:text-3xl font-extrabold text-accent tracking-tight">{num}</div>
                  <div className="font-mono text-[10px] md:text-xs text-slate-400 font-bold tracking-widest uppercase mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Cards Section */}
          <div className="max-w-[1200px] mx-auto px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* R&W Card */}
              <div className="bg-surface rounded-2xl p-8 border border-outline-variant/35 shadow-sm hover:shadow-md transition-all flex flex-col justify-between hover-lift">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon name="history_edu" className="text-xl" />
                    </span>
                    <h3 className="font-body font-bold text-xl md:text-2xl text-on-surface">Reading & Writing</h3>
                  </div>
                  <p className="text-[14.5px] text-on-surface-variant leading-relaxed mb-6">
                    Master SAT English syntax, vocabulary, reading inferences, and rhetorical strategies to maximize your verbal score.
                  </p>
                  
                  <div className="mb-6">
                    {prices ? (
                      <PriceBadge amount={prices.rw.amount} period={prices.rw.period} accent="blue" />
                    ) : (
                      <LoadingSkeleton />
                    )}
                  </div>

                  <div className="border-t border-outline-variant/30 pt-6 space-y-4">
                    <div className="flex gap-2.5 items-start">
                      <CheckIcon />
                      <span className="text-on-surface font-medium text-sm leading-relaxed">3 live sessions per week (English specific)</span>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <CheckIcon />
                      <span className="text-on-surface font-medium text-sm leading-relaxed">Full coverage of Reading & Writing modules</span>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <CheckIcon />
                      <span className="text-on-surface font-medium text-sm leading-relaxed">Grammar drills & sentence completion shortcuts</span>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <CheckIcon />
                      <span className="text-on-surface font-medium text-sm leading-relaxed">Curated verbal practice question banks</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href={getWhatsAppLink("Reading & Writing Module")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-shimmer flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold uppercase tracking-wider text-on-primary shadow-sm hover:bg-accent transition-all cursor-pointer text-center border-none"
                  >
                    Enroll via WhatsApp
                    <Icon name="arrow_forward" className="text-sm" />
                  </a>
                </div>
              </div>

              {/* Math Card */}
              <div className="bg-surface rounded-2xl p-8 border border-outline-variant/35 shadow-sm hover:shadow-md transition-all flex flex-col justify-between hover-lift">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon name="calculate" className="text-xl" />
                    </span>
                    <h3 className="font-body font-bold text-xl md:text-2xl text-on-surface">Math Module</h3>
                  </div>
                  <p className="text-[14.5px] text-on-surface-variant leading-relaxed mb-6">
                    Acquire advanced skills in algebra, geometry, and problem solving, alongside extensive graphing calculator methods.
                  </p>
                  
                  <div className="mb-6">
                    {prices ? (
                      <PriceBadge amount={prices.math.amount} period={prices.math.period} accent="blue" />
                    ) : (
                      <LoadingSkeleton />
                    )}
                  </div>

                  <div className="border-t border-outline-variant/30 pt-6 space-y-4">
                    <div className="flex gap-2.5 items-start">
                      <CheckIcon />
                      <span className="text-on-surface font-medium text-sm leading-relaxed">3 live sessions per week (Math specific)</span>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <CheckIcon />
                      <span className="text-on-surface font-medium text-sm leading-relaxed">Desmos masterclass: Solve equations 2x faster</span>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <CheckIcon />
                      <span className="text-on-surface font-medium text-sm leading-relaxed">Advanced algebra & geometry formulas drills</span>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <CheckIcon />
                      <span className="text-on-surface font-medium text-sm leading-relaxed">Weekly past Math section exams & review</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href={getWhatsAppLink("Math Module")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-shimmer flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold uppercase tracking-wider text-on-primary shadow-sm hover:bg-accent transition-all cursor-pointer text-center border-none"
                  >
                    Enroll via WhatsApp
                    <Icon name="arrow_forward" className="text-sm" />
                  </a>
                </div>
              </div>

              {/* Complete Prep Card (Bundle) */}
              <div className="bg-surface rounded-2xl p-8 border-2 border-accent shadow-md hover:shadow-lg transition-all flex flex-col justify-between hover-lift relative">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-primary text-[10px] font-mono font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Recommended Bundle
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
                      <Icon name="auto_awesome" className="text-xl" />
                    </span>
                    <h3 className="font-body font-bold text-xl md:text-2xl text-on-surface">Complete SAT Prep</h3>
                  </div>
                  <p className="text-[14.5px] text-on-surface-variant leading-relaxed mb-6">
                    Our all-inclusive package covering the full verbal and math syllabus, complete past papers, and personal advising.
                  </p>
                  
                  <div className="mb-6">
                    {prices ? (
                      <PriceBadge amount={prices.bundle.amount} period={prices.bundle.period} accent="gold" />
                    ) : (
                      <LoadingSkeleton />
                    )}
                  </div>

                  <div className="border-t border-outline-variant/30 pt-6 space-y-4">
                    <div className="flex gap-2.5 items-start">
                      <StarIcon />
                      <span className="text-on-surface font-medium text-sm leading-relaxed">6 live classes per week (English + Math)</span>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <StarIcon />
                      <span className="text-on-surface font-medium text-sm leading-relaxed">Full-length adaptive practice tests</span>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <StarIcon />
                      <span className="text-on-surface font-medium text-sm leading-relaxed">All books, cheat-sheets, and past papers</span>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <StarIcon />
                      <span className="text-on-surface font-medium text-sm leading-relaxed">1-on-1 private strategy check-in audit</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href={getWhatsAppLink("Complete SAT Prep Bundle")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-shimmer flex items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-sm font-bold uppercase tracking-wider text-primary shadow-md hover:bg-accent/90 transition-all cursor-pointer text-center border-none"
                  >
                    Enroll via WhatsApp
                    <Icon name="arrow_forward" className="text-sm" />
                  </a>
                </div>
              </div>

            </div>

            {/* Direct inquiry info */}
            <div className="mt-16 text-center max-w-lg mx-auto bg-surface p-6 rounded-2xl border border-outline-variant/40 shadow-sm">
              <h4 className="font-bold text-sm text-primary mb-2">Need a Customized Study Plan?</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                Chat with our curriculum advisor directly on WhatsApp to design a prep plan tailored to your target test date and score goals.
              </p>
              <a
                href="https://wa.me/923164514334?text=Hi%20SAT%20Sharks!%20I'm%20looking%20for%20a%20customized%20SAT%20study%20prep%20plan."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-bold uppercase tracking-wider px-6 py-3 transition-colors shadow-sm cursor-pointer"
              >
                <Icon name="chat" className="text-[16px]" />
                Consult via WhatsApp
              </a>
            </div>

          </div>

          {/* Contact form block */}
          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
