module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");
  const entries = context.bindings.schedulerTable;

  context.res = {
    body: entries,
  };
};
