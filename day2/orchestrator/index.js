/*
 * params: url, payload, custom time, number of retry, email
 * Schedule request: make-request
 * Notification when failure: send-alert
 *
 */

const df = require("durable-functions");
const moment = require("moment");

module.exports = df.orchestrator(function* (context) {
  const input = context.df.getInput();

  const log = createReplaySafeLogger(context);
  log(
    "Received monitor request. url: " +
      (input ? input.url : undefined) +
      ". customTime: " +
      (input ? input.customTime : undefined) +
      "."
  );
  validateRequest(input);

  log("Making API request " + input.url + ", " + input.payload);
  const response = yield context.df.callActivity("make-request", input);
  log(response);
  yield context.df.callActivity("send-alert", input.email);

  log("Monitor expiring.");
});

function validateRequest(request) {
  if (!request) {
    throw new Error("An input object is required.");
  }
  if (!request.url) {
    throw new Error("A url input is required.");
  }
}

function createReplaySafeLogger(context) {
  return function () {
    if (!context.df.isReplaying) {
      context.log.apply(context, arguments);
    }
  };
}
