import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function replaceColorsInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Directly replace all tailwind 'teal-' classes with 'blue-'
    content = content.replace(/teal-/g, 'blue-');

    // To make gradients pop a bit more matching the layout, replace the newly formed blue-to-blue gradients with blue-to-indigo
    content = content.replace(/from-blue-\d{3} to-blue-\d{3}/g, 'from-blue-600 to-indigo-600');
    content = content.replace(/from-blue-\d{3} via-transparent to-transparent/g, 'from-slate-900/80 via-transparent to-transparent');
    content = content.replace(/from-blue-\d{3} to-transparent/g, 'from-slate-900/90 to-transparent');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            replaceColorsInFile(fullPath);
        }
    }
}

walk(path.join(__dirname, 'src', 'pages'));
walk(path.join(__dirname, 'src', 'components'));
console.log('Done replacing colors.');
