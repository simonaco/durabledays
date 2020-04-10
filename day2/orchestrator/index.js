/*
 * params: url, payload, scheduledDate, retry, email, method
 * Schedule request: make-request
 * Notification when failure: send-alert
 *
 */

const df = require("durable-functions");
const moment = require("moment");

module.exports = df.orchestrator(function* (context) {
  const input = context.df.getInput();

  const log = createReplaySafeLogger(context);
  validateRequest(input);
  const deadline = moment.utc(input.scheduledDate);
  // Durable timers are currently limited to 7 days
  yield context.df.createTimer(deadline.toDate());
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
  if (!request.method) {
    throw new Error("A method input is required.");
  }
  if (!request.retry) {
    throw new Error("A retry input is required.");
  }
  if (!request.scheduledDate) {
    throw new Error("A scheduledDate input is required.");
  }
  if (!request.email) {
    throw new Error("A email input is required.");
  }
}

function createReplaySafeLogger(context) {
  return function () {
    if (!context.df.isReplaying) {
      context.log.apply(context, arguments);
    }
  };
}
