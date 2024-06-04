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
function convertMarkdownToHTML(markdown) {
    let html = markdown
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')  // Bold
      .replace(/_(.*?)_/g, '<i>$1</i>')        // Italic
      .replace(/`(.*?)`/g, '<tt>$1</tt>')      // Monospaced
      .replace(/```([\s\S]*?)```/g, '<pre>$1</pre>') // Preformatted block
      .replace(/^(?!<\/?pre>)(.*)$/gm, '<p>$1</p>'); // Add <p> tags to paragraphs
  
    // Remove empty <p> tags
    html = html.replace(/<p>\s*<\/p>/g, '');
  
    return html;
  }
  