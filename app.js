const fs = require('fs');

function validateMarkdown(markdown) {
  const openingTags = [
    { tag: '**', count: (markdown.match(/\*\*/g) || []).length },
    { tag: '_', count: (markdown.match(/_/g) || []).length },
    { tag: '`', count: (markdown.match(/`/g) || []).length },
    { tag: '```', count: (markdown.match(/```/g) || []).length }
  ];

  for (let tag of openingTags) {
    if (tag.count % 2 !== 0) {
      return false;
    }
  }

  return true;
}
