const mongoose = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator");

const employeeSchema = new mongoose.Schema({
    
    firstname:{
        type: String,
        required : true
    },
    lastname:{
        type: String,
        required : true
    },
    gender:{
        type: String,
        required : true
    },
    dob:{
        type: Date,
        required : true
    },
    mobile:{
        type: Number,
        required : true,
        unique: true
    },
    email:{
        type: String,
        required : true,
        unique: true
    },
    role:{
        type:String,
        required: true,

    },
    password:{
        type: String,
        required: true
    }
})
//employeeSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Schema', employeeSchema)