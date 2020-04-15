module.exports = async function (context, req) {
  context.log("Deploy to specific path");
  const entries = context.bindings.schedulerTable;

  context.res = {
    body: entries,
  };
};
