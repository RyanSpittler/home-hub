var config = require('./config.json');
// var weather = require('./lib/weather.js');
var soundBar = require("./lib/soundBar.js");

// Entrypoint for AWS Lambda
exports.handler = function(event, context) {
  var zipCode = event.text ? event.text.trim() : null;

  console.log('[EVENT] ', event);

  // basic auth
  if(!isValidAuth(event.secret, event.key)) {
    return context.fail('Unauthorized request. Check authentication credentials.');
  }

  // validate zip code
  if(!isValidZip(zipCode)) {
    return context.fail('Must be a valid 5 digit zip code.');
  }

  // get weather && respond to slack request
  weather.byZip(zipCode).then(function(response) {
    context.succeed(response);
  }).catch(function(reason) {
    console.log('[FAIL] Unable to get weather: ', reason);
    context.fail('Unable to get weather. Try again later.');
  });
};

function isValidZip(zip) {
  return zip && zip.length === 5 && !isNaN(zip);
}

function isValidAuth(secret, key) {
  return secret && key && secret === config.auth.secret && key === config.auth.key;
}
