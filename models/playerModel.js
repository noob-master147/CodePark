const mongoose = require('mongoose')
const validator = require("validator")

const playerSchema = mongoose.Schema({
    uid: {
        required: true,
        type: String,
        trim: true,
        unique: true,
    },

    name :{
        type: String,
        maxlength: [20, 'Entered name is too long !!'],
        minlength: [5, 'Entered name is too short !!'],
        required: [true, 'you have to have a username'],
        unique:true,

        validate: {
            validator: (value) =>{
                for(var i = 0; i<value.length; i++){
                    if(!validator.isAlpha(value[i])){
                        return false
                    }
                }
                return true
            },
            message: 'Only Alphabets required'
        }
    },

    email: {
        type: String,
        required: [true,'enter email so that we can spam you'],
        trim: true,
        maxlength:[50,'too long for an email, difficult to spam you'],
        unique:true,
        validate:{
            validator: validator.isEmail,
            message: 'plz provide a valid mail to us for spamming'
        }
    },

    pointsEarned: {
        type: Number,
        min: 0,
        max: 999999,
        default:0,
    }
})

//Middleware for complex validation
playerSchema.pre("save", async function(next){
    next()
})

playerSchema.post("save", async function(error, doc, next){
    if(error){
        const errorMsg = await userModelError(error)
        next(errorMsg)
    } else{
        next()
    }
})

//Exporting the module
const Player = mongoose.model('Player', playerSchema)
module.exports = Player