const fetch = require('node-fetch')


const tag = ['dsa', 'loop']
const preUrl = 'https://api.codepark.in/topic/'
const postUrl = '/related/questions?node=0'
const urlList = []
const quesUidList = []
const quesApiList = []


for (let index = 0; index < tag.length; index++) {
  const element = tag[index];
  const url = preUrl + element + postUrl
  urlList.push(url)
}

// console.log(urlList)

// for (let index = 0; index < urlList.length; index++) {
//   const api = urlList[index];

//   fetch(api)
//   .then(response => response.json)
//   .then(json => console.log(json.questionData.question))
//   .catch(error => console.log(error))

// }

const getQuestion = function (agent) {
  fetch('https://api.codepark.in/topic/dsa/related/questions?node=0')
    .then(res => res.json())
    .then(json => {
      quesName = json.questions[0].question
      console.log(quesName)
    })
    .catch(err => console.log(err))
}

getQuestion()