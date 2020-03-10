const fetch = require('node-fetch')

const getQuestion = () => {
    return new Promise((resolve, reject) => {
        const tag = ['loop']
        const apiList = []
        const redirectList = []
        tag.forEach(tag => {
            const url = `https://api.codepark.in/topic/${tag}/related/questions`
            apiList.push(url)
        })
        apiList.forEach(api => {
            fetch(api)
                .then((res) => res.json())
                .then((json) => json.questions)
                .then((question) => {
                    question.forEach(question => {
                        const listItem = {
                            url: `https://www.codepark.in/question/view/${question.qname}/${question.uid}`,
                            name: `${question.question}`
                        }
                        redirectList.push(listItem)
                        resolve(redirectList)
                    })
                })
                .catch((error) => {
                    reject(error)
                })
        })
    })
}

getQuestion()
    .then((res) => {
        console.log(res[0].url)
        console.log(res[0].name)
    })
    .catch((err) => {
        console.log('Encountered An Error', err)
    })


