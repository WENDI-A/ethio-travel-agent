
const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'scripts', 'seed.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace "}\n{" with "},\n{" to add missing commas between city objects
// We match the specific indentation pattern we saw: 4 spaces closing brace, newline, 0 spaces opening brace
// But let's be more flexible to catch all cases
content = content.replace(/(\n\s*\}\s*)\n(\s*\{)/g, '$1,\n$2');

// Also fix the indentation of the opening brace if it's 0 spaces
content = content.replace(/(\n\s*\}\,\s*)\n(\{)/g, '$1\n    $2');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed commas in seed.ts');
