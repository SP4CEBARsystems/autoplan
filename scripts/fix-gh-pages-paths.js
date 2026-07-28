const fs = require('fs');
const path = require('path');

const basePath = (process.env.PUBLIC_URL || '/autoplan/').replace(/\\/g, '/');
const normalizedBasePath = basePath.endsWith('/') ? basePath : `${basePath}/`;
const buildDir = path.join(process.cwd(), 'web-build');

function rewriteRootPathValues(content) {
  content = content.replace(/(href|src|content)\s*=\s*(["'])(\/+)([^"']*)\2/gi, (match, attr, quote, slash, pathValue) => {
    const normalizedPathValue = pathValue.replace(/\/{2,}/g, '/');
    if (normalizedPathValue.startsWith('autoplan/')) {
      return `${attr}=${quote}/${normalizedPathValue}${quote}`;
    }
    return `${attr}=${quote}${normalizedBasePath}${normalizedPathValue}${quote}`;
  });

  content = content.replace(/("start_url"|"src")\s*:\s*(["'])(\/+)([^"']*)\2/g, (match, key, quote, slash, pathValue) => {
    const normalizedPathValue = pathValue.replace(/\/{2,}/g, '/');
    if (normalizedPathValue.startsWith('autoplan/')) {
      return `${key}: ${quote}/${normalizedPathValue}${quote}`;
    }
    return `${key}: ${quote}${normalizedBasePath}${normalizedPathValue}${quote}`;
  });

  return content;
}

function rewriteFile(filePath) {
  const fullPath = path.join(buildDir, filePath);
  if (!fs.existsSync(fullPath)) {
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');

  content = content.replace(/\\/g, '/');
  content = rewriteRootPathValues(content);

  if (!content.includes('<base href=')) {
    content = content.replace(/<head>/i, `<head><base href="${normalizedBasePath}">`);
  }

  fs.writeFileSync(fullPath, content);
}

rewriteFile('index.html');
rewriteFile('manifest.json');

console.log(`Updated web build paths to use ${normalizedBasePath}`);
