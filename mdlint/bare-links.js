module.exports = {
  names: ["custom/no-bare-links"],
  description: "Avoid bare links.",
  tags: ["links", "style"],
  function: function (params, onError) {
    const bareLinkRegex = /\bhttps?:\/\/[^\s<>"'`)]*/g;

    params.tokens.forEach((token) => {
      // Only check inline text (not code, fenced code, links, etc.)
      if (
        token.type === "inline" &&
        token.children &&
        !["code_block", "fence", "link_open"].includes(token.type)
      ) {
        token.children.forEach((child) => {
          if (child.type === "text" && bareLinkRegex.test(child.content)) {
            // Skip if the link is inside Markdown link syntax: [text](url)
            const isInLink = token.children.some(
              (c) => c.type === "link_open" || c.type === "link_close"
            );
            if (!isInLink) {
              const match = child.content.match(bareLinkRegex);
              if (match) {
                onError({
                  lineNumber: token.lineNumber,
                  detail:
                    "Avoid bare links. If the link should be clickable, use the link syntax; otherwise, use inline code.",
                  context: match[0]
                });
              }
            }
          }
        });
      }
    });
  }
};
