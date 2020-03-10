const chalk = require('chalk')
const fetch = require('node-fetch')

const returnQuestion = (req) => {
    return new Promise(async (resolve, reject) => {

        const tag = req.queryResult.parameters.tag
        let apiList = []
        let redirectList = []
        tag.forEach(tag => {
            const url = `https://api.codepark.in/topic/${tag.toLowerCase()}/related/questions`
            apiList.push(url)
        })
        console.log(apiList)
        apiList.forEach(api => {
            fetch(api)
                .then((res) => res.json())
                .then((json) => {
                    if (json.code == 0) {
                        return json.questions
                    } else {
                        const item = [
                            {
                                "simpleResponse": {
                                    "textToSpeech": `${json.message}`
                                }
                            }
                        ]
                        resolve(item)
                    }
                })
                .then((question) => {
                    question.forEach(question => {
                        const listItem = {
                            url: `https://www.codepark.in/question/view/${question.qname}/${question.uid}`,
                            name: `${question.question}`,
                            answer: `${question.answers.length}`
                        }
                        redirectList.push(listItem)
                    })
                    // console.log(redirectList)
                    
                    return redirectList
                })

                .then((redirectObject) => {
                    if (redirectObject.length >= 2) {
                        const carouselBrowseItem = []
                        redirectObject.forEach(obj => {
                            const data = {
                                "title": obj.name,
                                "openUrlAction": {
                                    "url": obj.url
                                },
                                "description": `Solved By ${obj.answer} Users`,
                                "image": {
                                    "url": "https://i.ibb.co/DVwng4F/logo.png",
                                    "accessibilityText": "CodePark"
                                }
                            }
                            carouselBrowseItem.push(data)
                        })
                        const item = [
                            {
                                "simpleResponse": {
                                    "textToSpeech": "Here are few questions from CodePark"
                                }
                            },
                            {
                                "carouselBrowse": {
                                    "items": carouselBrowseItem
                                }
                            }
                        ]
                        resolve(item)

                    } else {
                        const item = [
                            {
                                "simpleResponse": {
                                    "textToSpeech": "Here is a matching result from CodePark"
                                }
                            },
                            {
                                "basicCard": {
                                    "title": `${redirectObject[0].name}`,
                                    "subtitle": `Solved By ${redirectObject[0].answer} Users`,
                                    "image": {
                                        "url": "https://i.ibb.co/DVwng4F/logo.png",
                                        "accessibilityText": "CodePark"
                                    },
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
                        resolve(item)
                    }
                })
                .catch(error => reject(error))
        })
    })
}

module.exports = {
    returnQuestion
}

