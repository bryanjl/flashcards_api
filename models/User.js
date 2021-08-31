const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email address'],
        validate: {
            validator: checkEmail,
            message: 'Not a valid e-mail'
        }
    },
    username: {
        type: String,
        required: [true, 'Please add a username'],
        unique: [true, 'That username has been taken.']
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        select: false
    }
});

function checkEmail() {
    return validator.isEmail(this.email);
}

module.exports = new mongoose.model('User', UserSchema);