const express = require('express');
const router = express.Router();
const control = require('../controllers/controller');



/* GET users listing. */
router.post('/', (req, res) => {
  control.returnQuestion(req.body)
    .then((redirectObject) => {
      // console.log(redirectObject)
      const data = {
        "payload": {
          "google": {
            "expectUserResponse": true,
            "richResponse": {
              "items": [
                {
                  "simpleResponse": {
                    "textToSpeech": "Here are few questions from CodePark"
                  }
                },
                {
                  "basicCard": {
                    "title": "CodePark",
                    "subtitle": "Question",
                    "formattedText": redirectObject[0].name,
                    "buttons": [
                      {
                        "title": "Click Here",
                        "openUrlAction": {
                          "url": redirectObject[0].url
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        }
      }

      console.log(redirectObject[0])
      return data
    })
    .then(resp => res.status(200).send(resp))
    .catch(err => res.status(400).send(err))
})

module.exports = router;
