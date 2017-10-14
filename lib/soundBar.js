var config = require("../config.json");
var rp = require('request-promise');
var uri = "http://" + config.home.ip + ":" + config.home.soundBarPort + "/menu_native/dynamic/audio_settings/input/current_input";
var hashVal

module.exports = {
  setInput: putInput
};

function getHashVal() {
  var options = {
    uri: uri,
    json: true
  };
  return rp(options)
}

function putInput(input) {
  return getHashVal().then(function(body) {
      hashVal = body.ITEMS[0].HASHVAL;
      var options = {
        method: "PUT",
        uri: uri,
        body: {
          "REQUEST": "MODIFY",
          "VALUE": input,
          "HASHVAL": hashVal
        },
        json: true
      };

    return rp(options).then(function(body) {
      return body;
    });
  });
}
