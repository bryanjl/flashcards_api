const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    let user = this;
    // only hash password if its modifed
    if(!user.isModifed('password')) {
        return next();
    }

    //get salt and hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword.toString(), this.password);
}

UserSchema.methods.signJWT = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
}

//check if email is valid
function checkEmail() {
    return validator.isEmail(this.email);
}

module.exports = new mongoose.model('User', UserSchema);