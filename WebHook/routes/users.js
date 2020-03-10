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
                  "carouselBrowse": {
                    "items": [
                      {
                        "title": redirectObject[0].name,
                        "openUrlAction": {
                          "url": redirectObject[0].url
                        },
                        "image": {
                          "url":"https://i.ibb.co/DVwng4F/logo.png",
                          "accessibilityText": "CodePark"
                        }
                      },
                      {
                        "title": redirectObject[1].name,
                        "openUrlAction": {
                          "url": redirectObject[1].url
                        },
                        "image": {
                          "url":"https://i.ibb.co/DVwng4F/logo.png",
                          "accessibilityText": "CodePark"
                        }
                      },
                      {
                        "title": redirectObject[2].name,
                        "openUrlAction": {
                          "url": redirectObject[2].url
                        },
                        "image": {
                          "url":"https://i.ibb.co/DVwng4F/logo.png",
                          "accessibilityText": "CodePark"
                        }
                      },
                      {
                        "title": redirectObject[3].name,
                        "openUrlAction": {
                          "url": redirectObject[3].url
                        },
                        "image": {
                          "url":"https://i.ibb.co/DVwng4F/logo.png",
                          "accessibilityText": "CodePark"
                        }
                      },
                      {
                        "title": redirectObject[4].name,
                        "openUrlAction": {
                          "url": redirectObject[4].url
                        },
                        "image": {
                          "url":"https://i.ibb.co/DVwng4F/logo.png",
                          "accessibilityText": "CodePark"
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

