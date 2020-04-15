module.exports = async function (context, req) {
  context.log("Deploy from Github Action");
  const entries = context.bindings.schedulerTable;

  context.res = {
    body: entries,
  };
};
