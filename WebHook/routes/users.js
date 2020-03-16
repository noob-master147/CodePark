const express = require('express');
const router = express.Router();
const control = require('../controllers/controller');



/* GET users listing. */
router.post('/', (req, res) => {
  control.returnQuestion(req.body)
    .then((obj) => {
      // console.log("user ", obj.code)
      if(obj.code){
        const data = {
          "payload": {
            "google": {
              "expectUserResponse": true,
              "richResponse": {
                "items": obj.item
              }
            }
          }
        }
        return data
      } else {
        const data = {
          "payload": {
            "google": {
              "expectUserResponse": true,
              "richResponse": {
                "items": obj.item
              }
            }
          }
        }
        return data
      }
    })
    .then(resp => res.status(200).send(resp))
    .catch((err) => res.status(400).send(err))
})

module.exports = router;

