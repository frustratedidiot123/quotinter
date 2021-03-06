let express = require('express');
let bodyParser = require('body-parser');
let alexa = require('alexa-app');
let invert = require('lodash.invert');
let keyBy = require('lodash.keyby');
//let phonecodes = require("./phone.json");
//let countries = require("./names.json");
let quotesall = require("./quotes1.json");
//let quotesall = require("./quotesfbig.json");


let alexaApp = new alexa.app('alexa');

let expressApp = express();


let newcountries = invert(countries);


alexaApp.express({expressApp: expressApp, router: express.Router(), debug: false, checkCert: true});

alexaApp.launch( (request, response) => {
  let content = `Welcome to International Call Buddy! Give me a country name and I'll give you the international calling code!`;

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
    let givencountry = request.slot('Country');

    let selabrev = newcountries[givencountry];
console.log('country:', givencountry);
if (selabrev) {

    let callingcode = phonecodes[selabrev];

    
console.log('callingcode:', callingcode);

    if (callingcode) {
      response.say(`The international calling code for ${givencountry} is <say-as interpret-as='spell-out'>${callingcode}</say-as>`);
      response.shouldEndSession(true);
    
   } else {
      response.say(`I\'m sorry, I do not have a calling code on file for ${givencountry}. Though I do recognize the country, they might not have international calling capabilities yet. `);
  response.shouldEndSession(true);
}
     } else {
      response.say(`I\'m sorry, I do not recognize ${givencountry}. Speaking literally, of course, not diplomatically.`);
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
