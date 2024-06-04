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
  function main() {
    const args = process.argv.slice(2);
    if (args.length < 1) {
      console.error('Usage: node app.js <input.md> [--out <output.html>]');
      process.exit(1);
    }
  
    const inputFile = args[0];
    const outputFlagIndex = args.indexOf('--out');
    const outputFile = outputFlagIndex !== -1 ? args[outputFlagIndex + 1] : null;
  
    try {
      const markdown = fs.readFileSync(inputFile, 'utf8');
  
      if (!validateMarkdown(markdown)) {
        throw new Error('Invalid markdown syntax');
      }
  
      const html = convertMarkdownToHTML(markdown);
  
      if (outputFile) {
        fs.writeFileSync(outputFile, html, 'utf8');
      } else {
        console.log(html);
      }
    } catch (err) {
      console.error('Error:', err.message);
      process.exit(1);
    }
  }
  
  main();
  
  Temporary mistake
