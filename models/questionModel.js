const mongoose = require('mongoose')
const validator = require('validator')

const questionSchema = mongoose.Schema({
    name:{
        type: String,
        unique: true,
        require: true,
        minlength:[1, 'Name of the question too short'],
        maxlength:[20, 'Name of the question too long']
    },

    questionLevel:{
        type: Number,
        required: true,
        unique: true,
        max: [5, "level between 1-5"],
        min: [1, "level between 1-5"],
    },

    question:{
        type: String,
        required: true,
        unique: true,
        maxlength: [1000, "Question can't be longer then 1000 characters"],
        minlength: [10, "Question should contain atleast 10 characters"],
    },

    answer:{
        type: String,
        maxlength: [500, "Sorry, answer can't be more then 500 characters"],
        minlength: [2, "Sorry, answer should be atleast 1 character"],
    },

    questionCreator:{
        type: String,
        uid: String,
        required: true,
    },

    upvotes:{
        type: Number,
        require: true,
        default: 0,
    },
})

questionSchema.pre("save", async function(next){
    next()
})

questionSchema.post("save", async function(error, doc, next){
    if(error){
        const errorMsg = questionModelError(error)
        next(errorMsg)
    } else{
        next()
    }
})

const Question = mongoose.model("Question", questionSchema)
module.exports = Question