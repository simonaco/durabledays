const df = require("durable-functions");

module.exports = df.orchestrator(function*(context) {
  const rootDirectory = context.df.getInput();
  if (!rootDirectory) {
    throw new Error("A directory path is required as an input.");
  }
  //get list of file names
  const files = yield context.df.callActivity("get-files", rootDirectory);

  //copy files to the cloud
  const tasks = [];
  for (const file of files) {
    tasks.push(context.df.callActivity("copy-files", file));
  }

  const results = yield context.df.Task.all(tasks);
  const totalBytes = results.reduce((prev, curr) => prev + curr, 0);
  return totalBytes;
});
