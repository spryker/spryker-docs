module.exports = {
  names: ["custom/no-bare-links"],
  description: "Avoid bare links.",
  tags: ["links", "style"],
  function: function(params, onError) {
    const bareLinkRegex = /\bhttps?:\/\/[^\s)<>"'`]+/g;

    params.lines.forEach((line, lineIndex) => {
      const matches = line.match(bareLinkRegex);
      if (matches) {
        matches.forEach((match) => {
          onError({
            lineNumber: lineIndex + 1,
            detail: "Avoid bare links. If the link should be clickable, use the link syntax; otherwise, use inline code.",
            context: match
          });
        });
      }
    });
  }
};
