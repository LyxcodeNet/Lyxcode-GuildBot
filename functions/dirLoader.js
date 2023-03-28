const glob = require("glob")
const { resolve, join, extname } = require("path");

async function deleteCachedFile(file) {
  const filePath = resolve(file);
  if (require.cache[filePath]) {
    delete require.cache[filePath];
  }
}

async function dirLoader(dirName) {
  try {
    const files = await glob(join(process.cwd(), dirName, "**/*.js").replace(/\\/g, "/"));
    const jsFiles = files.filter(file => extname(file) === '.js');
    await Promise.all(jsFiles.map(deleteCachedFile));
    return jsFiles;
  } catch (error) {
    console.error(`Error loading files from directory ${dirName}: ${error}`);
    throw error;
  }
}

module.exports = {dirLoader};