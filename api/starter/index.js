const df = require("durable-functions");

module.exports = async function (context, req) {
  const client = df.getClient(context);
  const instanceId = await client.startNew(
    req.params.functionName,
    undefined,
    req.body
  );

  context.log(
    `Started orchestration with ID = '${instanceId}'. This is a new deployment`
  );

  return client.createCheckStatusResponse(context.bindingData.req, instanceId);
};
