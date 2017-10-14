var config = require('./config.json');
var soundBar = require("./lib/soundBar.js");

// Entrypoint for AWS Lambda
exports.handler = function(event, context) {
  console.log('[EVENT] ', event);

  // basic auth
  if(!isValidAuth(event.secret, event.key)) {
    return context.fail('Unauthorized request. Check authentication credentials.');
  }

  // get input && respond
  soundBar.setInput(event.text).then(function(response) {
    context.succeed(response);
  }).catch(function(reason) {
    console.log('[FAIL] Unable to get current input: ', reason);
    context.fail('Unable to get input. Try again later.');
  });
};

function isValidAuth(secret, key) {
  return secret && key && secret === config.auth.secret && key === config.auth.key;
}
