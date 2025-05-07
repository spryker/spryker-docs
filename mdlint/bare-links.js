module.exports = {
  names: ["custom/no-bare-links"],
  description: "Avoid bare links.",
  tags: ["links", "style"],
  function: function (params, onError) {
    const bareLinkRegex = /\bhttps?:\/\/[^\s<>"'`)]*/g;

    params.tokens.forEach((token) => {
      // Only inspect inline text tokens
      if (token.type === "inline" && token.children) {
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
                  "Avoid bare links. If the link should be clickable, use the link syntax; otherwise, use inline code.",
                context: match[0]
              });
            }
          }
        });
      }
    });
  }
};
