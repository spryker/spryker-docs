// custom-rules/no-space-in-emphasis.js
"use strict";

module.exports = {
  names: ["NO_SPACE_IN_EMPHASIS"],
  description: "Remove spaces from emphasis",
  tags: ["emphasis", "whitespace"],
  function: function(params, onError) {
    params.tokens.forEach(token => {
      // Skip headings (e.g., ## ...)
      if (token.type === "heading_open") return;

      if (token.type === "inline" && token.children) {
        token.children.forEach((child, idx) => {
          if ((child.type === "em_open" || child.type === "strong_open") &&
              token.children[idx + 1] &&
              token.children[idx + 1].type === "text" &&
              /^\s/.test(token.children[idx + 1].content)) {
            onError({
              lineNumber: child.lineNumber,
              detail: "Space after opening emphasis marker",
              context: child.markup + token.children[idx + 1].content.slice(0, 10)
            });
          }

          if ((child.type === "em_close" || child.type === "strong_close") &&
              token.children[idx - 1] &&
              token.children[idx - 1].type === "text" &&
              /\s$/.test(token.children[idx - 1].content)) {
            onError({
              lineNumber: child.lineNumber,
              detail: "Space before closing emphasis marker",
              context: token.children[idx - 1].content.slice(-10) + child.markup
            });
          }
        });
      }
    });
  }
};
