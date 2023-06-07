const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minLength:4, 
        maxLength: 20
    },
    mail: {
        type: String,
        required: [true, 'Please provide mail'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid mail'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minLength:8
    }
})

UserSchema.pre('save', async function(/* next */){

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    /* next(); */

})

module.exports = mongoose.model('User', UserSchema)