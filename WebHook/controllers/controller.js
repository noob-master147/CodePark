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
                        return ({
                            question: json.questions,
                            code: json.code
                        })
                    } else {
                        const item = [
                            {
                                "simpleResponse": {
                                    "textToSpeech": `${json.message}`
                                }
                            },
                            {
                                "simpleResponse": {
                                    "textToSpeech": `Try something else?`
                                }
                            }
                            
                        ]
                        resolve({
                            item: item, 
                            code: json.code
                        })
                    }
                })
                .then((data) => {
                    // console.log("1 ", data.code)
                    data.question.forEach(question => {
                        const listItem = {
                            url: `https://www.codepark.in/question/view/${question.qname}/${question.uid}`,
                            name: `${question.question}`,
                            answer: `${question.answers.length}`
                        }
                        redirectList.push(listItem)
                    })

                    return ({
                        redirectList: redirectList,
                        code: data.code
                    })
                })

                .then((data) => {
                    // console.log("2 ", data.code)
                    if (data.redirectList.length >= 2) {
                        const carouselBrowseItem = []
                        data.redirectList.forEach(obj => {
                            const Qdata = {
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
                            carouselBrowseItem.push(Qdata)
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
                        resolve({
                            item: item, 
                            code: data.code
                        })

                    } else {
                        const item = [
                            {
                                "simpleResponse": {
                                    "textToSpeech": "Here is a matching result from CodePark"
                                }
                            },
                            {
                                "basicCard": {
                                    "title": `${redirectList[0].name}`,
                                    "subtitle": `Solved By ${redirectList[0].answer} Users`,
                                    "image": {
                                        "url": "https://i.ibb.co/DVwng4F/logo.png",
                                        "accessibilityText": "CodePark"
                                    },
                                    "buttons": [
                                        {
                                            "title": "Click Here",
                                            "openUrlAction": {
                                                "url": redirectList[0].url
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                        resolve({
                            item: item, 
                            code: data.code
                        })
                    }
                })
                .catch(error => reject(error))
        })
    })
}

module.exports = {
    returnQuestion
}

