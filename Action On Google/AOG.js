const fetch = require('node-fetch')



const getQuestion = (() => {
  const tag = ['loop'];
  const preUrl = 'https://api.codepark.in/topic/';
  const postUrl = '/related/questions';
  const urlList = [];
  const questionList = [];
  const quesName = [];

  //Loop to create the api urls from tags
  for (let index = 0; index < tag.length; index++) {
    const element = tag[index];
    const url = preUrl + element + postUrl;
    urlList.push(url);
  }
  urlList.forEach((url) => {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        json.questions.forEach((obj) => {
          questionList.push(`https://api.codepark.in/content/questions/details/${obj.uid}`);
          quesName.push(obj.question);
        })
      })
      .then(() => {
        setTimeout(() => {
        }, 3000);
      })
      .then(() =>{
        console.log(questionList)
      })
  })
})

getQuestion()
//   .then(res => {
//     console.log(questionList)

//   })
//   .catch(e => console.log(e))


//show me top 10 questions in loop

// agent.add();
// agent.add(new Card({
//   title: ` `,
//   imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
//   buttonText: 'This is a button',
//   buttonUrl: 'https://assistant.google.com/'
// })
// );


// urlList.forEach((url) => {

// });