import React from "react";
import katex from "katex";

export function renderFormattedText(text: string | undefined | null): React.ReactNode {
  if (!text) return "";
  
  // Split by $$ (block math) and $ (inline math)
  const mathParts = text.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g);

  return (
    <>
      {mathParts.map((part, index) => {
        if (part.startsWith("$$") && part.endsWith("$$")) {
          const formula = part.slice(2, -2).trim();
          try {
            const html = katex.renderToString(formula, { displayMode: true, throwOnError: false });
            return (
              <span
                key={index}
                dangerouslySetInnerHTML={{ __html: html }}
                className="block my-2 overflow-x-auto font-sans"
              />
            );
          } catch (err) {
            console.error("KaTeX error:", err);
            return <code key={index} className="text-error">{part}</code>;
          }
        } else if (part.startsWith("$") && part.endsWith("$")) {
          const formula = part.slice(1, -1).trim();
          
          // Prevent standard currency strings ($3 for the first hour and $) from being parsed as inline math.
          // Inline LaTeX math typically doesn't contain multiple regular English words without math symbols.
          const wordCount = formula.split(/\s+/).length;
          const hasMathSymbol = /[=+\-*\/\\^{}()<>_]/.test(formula) || /^[a-zA-Z]$/.test(formula);
          const isCurrency = wordCount > 2 && !hasMathSymbol;
          
          if (isCurrency) {
            return part;
          }
          
          try {
            const html = katex.renderToString(formula, { displayMode: false, throwOnError: false });
            return (
              <span
                key={index}
                dangerouslySetInnerHTML={{ __html: html }}
                className="inline-block font-sans"
              />
            );
          } catch (err) {
            console.error("KaTeX error:", err);
            return <code key={index} className="text-error">{part}</code>;
          }
        } else {
          // Exponent parsing for regular text parts
          let normalized = part
            .replace(/²/g, "^2")
            .replace(/³/g, "^3")
            .replace(/⁴/g, "^4")
            .replace(/<sup>(.*?)<\/sup>/gi, "^$1");
            
          const subParts = normalized.split(/(\^[a-zA-Z0-9\-+]+)/g);
          
          return (
            <React.Fragment key={index}>
              {subParts.map((subPart, subIdx) => {
                if (subPart.startsWith("^")) {
                  const exponent = subPart.slice(1);
                  return (
                    <sup 
                      key={subIdx} 
                      style={{ 
                        fontSize: "0.95em", 
                        fontWeight: "normal", 
                        position: "relative", 
                        top: "-0.3em", 
                        margin: "0 0.05em",
                        display: "inline-block"
                      }}
                    >
                      {exponent}
                    </sup>
                  );
                }
                return subPart;
              })}
            </React.Fragment>
          );
        }
      })}
    </>
  );
}
