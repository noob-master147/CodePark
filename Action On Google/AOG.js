const fetch = require('node-fetch')
const tag = ['loop']
const preUrl = 'https://api.codepark.in/topic/'
const postUrl = '/related/questions'
const urlList = []
const questionList = []
const quesName = []
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
          const questionObj = `https://api.codepark.in/content/questions/details/${obj.uid}`
          questionList.push(questionObj);
          quesName.push(obj.question);
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
  .then(res => console.log(quesName))
  .catch(e => console.log(e))


  //show me top 10 questions in loop