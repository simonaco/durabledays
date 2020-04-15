module.exports = async function (context, input) {
  context.bindings.schedulerTable = [];
  context.bindings.schedulerTable.push({
    PartitionKey: "URL",
    RowKey: input.instanceId,
    Response: JSON.stringify(input.response),
    URL: input.url,
    Payload: input.payload,
    ScheduledDate: input.scheduledDate,
  });

  return `Hello ${context.bindings.name}!`;
};
