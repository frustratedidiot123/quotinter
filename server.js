let express = require('express');
let bodyParser = require('body-parser');
let alexa = require('alexa-app');
//Let bimap = require('bimap');
let phonecodes = require("./phone.json");
let countries = require("./names.json");



let alexaApp = new alexa.app('alexa');

let expressApp = express();


newcountries = {};
 $.each(countries,function(key,value){
        newcountries[value] = String(key);
    });


alexaApp.express({expressApp: expressApp, router: express.Router(), debug: false, checkCert: true});

alexaApp.launch( (request, response) => {
  let content = `Welcome to International Call Buddy! Give me a country name and I\'ll give you the international calling code!';

  response.card('Welcome', content);
  response.say(content);
  response.reprompt('Please Give me a country name, for instance, Canada.')
  response.shouldEndSession(false);
});

alexaApp.intent("Countrytocall", {
    slots: {Country: 'AMAZON.Country'},
    utterances: ['What is {-Country}', 'What is Hex for {-|Color}']
  },
  function (request, response) {
   

  
 //here goes phone anc other var
    let country = request.slot('Country');

    let selabrev = newcountries[country];
    let callingcode = phonecodes[selabrev];

    console.log('country:', country);
console.log('callingcode:', callingcode);

    if (selcountrycode) {
      response.say(`The country value for ${color} is <say-as interpret-as='spell-out'>${selectedColor}</say-as>`);
      response.shouldEndSession(true);
    }
    else {
      response.say(`I\'m sorry, are you sure ${color) is a valid country? I don\'t recognize it.`);
      response.shouldEndSession(true);
    }
  }
);

alexaApp.intent("AMAZON.HelpIntent", {
  "slots": {} },
//"utterances": [ 
 //              "help", "help me"
  //              ]
//  },
  function(request, response) {
  var HELP_MESSAGE = "Give me a country name and I'll give you the international calling code! Try saying Canada, or say stop to exit.";
var HELP_REPROMPT = "Please give me a country name, or say stop to exit.";
 response.say(HELP_MESSAGE).reprompt(HELP_REPROMPT).shouldEndSession(false);
  }
 );

alexaApp.intent("AMAZON.StopIntent", {
  "slots": {} },
//"utterances": [ 
 //              "help", "help me"
  //              ]
//  },
  function(request, response) {
    response.say("Ok. Goodbye!").shouldEndSession(true);
  }
 );

alexaApp.intent("AMAZON.CancelIntent", {
  "slots": {} },
//"utterances": [
 //              "help", "help me"
  //              ]
//  },
  function(request, response) {
    response.say("Ok. Goodbye!").shouldEndSession(true);
  }
 );

alexaApp.sessionEnded( (request, response) => {
  let content = 'Thank you. Goodbye!';
  response.card('Session Ended', content);
  response.say(content);
});



expressApp.listen(process.env.PORT || 5000, function() {
    console.log('Call buddy Running');
});
