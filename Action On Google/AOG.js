const fetch = require('node-fetch')



const getQuestion = (() => {
  return new Promise((resolve, reject) => {
    const tag = ['loop'];
    const urlList = [];
    const questionList = [];
    const redirectList = []

    //Loop to create the api urls from tags
    for (let index = 0; index < tag.length; index++) {
      const element = tag[index];
      const url = `https://api.codepark.in/topic/${element}/related/questions`
      urlList.push(url);
    }
    urlList.forEach((url) => {
      fetch(url)
        .then(res => res.json())
        .then(json => {
          json.questions.forEach((obj) => {
            questionList.push(`https://api.codepark.in/content/questions/details/${obj.uid}`);
            redirectList.push(`https://www.codepark.in/question/view/${obj.qname}/${obj.uid}`);
          })
        })
        .then(() => {
          console.log(questionList)
          console.log(redirectList)
        })
        .catch((error) => {
          console.log(error)
        })
    })
  })
})

getQuestion()

