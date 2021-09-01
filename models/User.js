const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email address'],
        unique: [true, 'This email is already in use'],
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

UserSchema.pre('save', async function(next) {
    //only hash password if its modifed
    // if(!this.isModifed('password')) {
    //     return next();
    // }

    //get salt and hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function(enteredPassword) {
    console.log(`this password: ${this.password} entered ${enteredPassword}`);
    return await bcrypt.compare(enteredPassword.toString(), this.password);
}

//check if email is valid
function checkEmail() {
    return validator.isEmail(this.email);
}

module.exports = new mongoose.model('User', UserSchema);