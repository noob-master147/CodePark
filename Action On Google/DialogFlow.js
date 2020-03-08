// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
const fetch = require('node-fetch');

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const fetch = require('node-fetch');

  const getQuestion = (agent) => {
    return new Promise((resolve, reject) => {
      const tag = agent.parameters.tag;
      const apiList = [];
      const redirectList = [];
      tag.forEach(tag => {
        const url = `https://api.codepark.in/topic/${tag}/related/questions`;
        apiList.push(url);
      });
      apiList.forEach(api => {
        fetch(api)
          .then((res) => res.json())
          .then((json) => json.questions)
          .then((question) => {
            question.forEach(question => {
              const listItem = `https://www.codepark.in/question/view/${question.qname}/${question.uid}`;
              redirectList.push(listItem);
              resolve(redirectList);
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  };

  getQuestion(agent)
    .then((res) => {
      console.log(res);
      //agent.add(res);
      res.forEach(redirectUrl => {
        agent.add(new Card({
          title: 'CodePark',
          imageUrl: 'data:image/png;base64,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',
          text: 'Question Text',
          buttonText: 'View',
          buttonUrl: `${redirectUrl}`
        })
        );
      })
    })
    .catch((err) => {
      console.log('Encountered An Error', err);
    });




  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('top_questions', getQuestion);
  // intentMap.set('', googleAssistantHandler);
  agent.handleRequest(intentMap);
});



