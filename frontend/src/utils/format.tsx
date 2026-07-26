import React from "react";

export function renderFormattedText(text: string | undefined | null) {
  if (!text) return "";
  
  // Convert common Unicode superscripts and HTML <sup> tags to standard ^ notation for parsing
  let normalized = text
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .replace(/⁴/g, "^4")
    .replace(/<sup>(.*?)<\/sup>/gi, "^$1");
    
  // Split by exponent blocks (e.g. ^4, ^12, ^a, ^+)
  const parts = normalized.split(/(\^[a-zA-Z0-9\-+]+)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith("^")) {
      const exponent = part.slice(1);
      return (
        <sup 
          key={index} 
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
    return part;
  });
}
