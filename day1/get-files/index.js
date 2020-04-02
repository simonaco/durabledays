const readdirp = require("readdirp");
module.exports = async function(context, rootDirectory) {
  context.log(`Searching for files under ${rootDirectory}...`);
  const allFilePaths = [];
  for await (const entry of readdirp(rootDirectory)) {
    const { path } = entry;
    console.log(`${JSON.stringify({ path })}`);
    allFilePaths.push(entry.fullPath);
  }
  return allFilePaths;
};
