module.exports = {
  names: ["custom/no-bare-links"],
  description: "Avoid bare links.",
  tags: ["links", "style"],
  function: function (params, onError) {
    const bareLinkRegex = /\bhttps?:\/\/[^\s<>"'`)]*/g;

    // Build a set of line numbers that fall inside Liquid {% %} blocks
    const liquidLines = new Set();
    let insideLiquid = false;
    params.lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (!insideLiquid && trimmed.startsWith("{%")) {
        insideLiquid = true;
      }
      if (insideLiquid) {
        liquidLines.add(index + 1); // line numbers are 1-based
        if (trimmed.includes("%}")) {
          insideLiquid = false;
        }
      }
    });

    params.tokens.forEach((token) => {
      // Only inspect inline text tokens
      if (token.type === "inline" && token.children) {
        // Skip tokens whose line falls inside a Liquid block
        if (liquidLines.has(token.lineNumber)) {
          return;
        }

        let insideLink = false;
        let insideImage = false;

        token.children.forEach((child) => {
          // Track when we're inside a Markdown link or image
          if (child.type === "link_open") {
            insideLink = true;
          } else if (child.type === "link_close") {
            insideLink = false;
          } else if (child.type === "image") {
            insideImage = true;
          }

          // Check text nodes that aren't part of links or images
          if (
            child.type === "text" &&
            !insideLink &&
            !insideImage &&
            bareLinkRegex.test(child.content)
          ) {
            const match = child.content.match(bareLinkRegex);
            if (match) {
              onError({
                lineNumber: token.lineNumber,
                detail:
                  "Avoid bare links. If the link should be clickable, use the link syntax; otherwise, inline code.",
                context: match[0]
              });
            }
          }
        });
      }
    });
  }
};
