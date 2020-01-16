const fetch = require('node-fetch')
const tag = ['loop', 'array', 'tree', 'dsa']
const preUrl = 'https://api.codepark.in/topic/'
const postUrl = '/related/questions'
const urlList = []
const questionList = []
for (let index = 0; index < tag.length; index++) {
  const element = tag[index];
  const url = preUrl + element + postUrl
  urlList.push(url)
}
const getQuestion = new Promise((resolve, reject) => {
  urlList.forEach((url) => {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        json.questions.forEach((obj) => {
          questionList.push(obj.question);
        })
      })
      .then(res => {
        setTimeout(() => {
          resolve()
        }, 5000);
      })
  })
})

getQuestion
  .then(res => console.log(questionList))
  .catch(e => console.log(e))
