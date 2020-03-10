const express = require('express');
const router = express.Router();
const control = require('../controllers/controller');



/* GET users listing. */
router.post('/', (req, res) => {
  control.returnQuestion(req.body)
    .then((items) => {
      const data = {
        "payload": {
          "google": {
            "expectUserResponse": true,
            "richResponse": {
              "items": items
            }
          }
        }
      }
      return data
    })
    .then(resp => res.status(200).send(resp))
    .catch((err) => res.status(400).send(err))
})

module.exports = router;

