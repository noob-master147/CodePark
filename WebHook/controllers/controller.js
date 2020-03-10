const chalk = require('chalk')
const fetch = require('node-fetch')

const returnQuestion = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(chalk.green("printing Request"))
            const tag = req.queryResult.parameters.tag
            const apiList = []
            const redirectList = []
            tag.forEach(tag => {
                const url = `https://api.codepark.in/topic/${tag.toLowerCase()}/related/questions`
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

        } catch (e) {
            console.log(chalk.red("Error in connection to controllers"))
            console.log(e)
            reject({
                statusCode: 400,
                payload: {
                    msg: "Server Side error contact support"
                }
            })
        }

    })
}

module.exports = {
    returnQuestion
}