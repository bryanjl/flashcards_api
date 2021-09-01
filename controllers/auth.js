const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');

//@desc     Register a new user
//@path     POST /api/v1/auth/register
//@auth     Public
exports.registerUser = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);
    
    res.status(200).json({
        success: true,
        message: user
    });
});

//@desc     Login a new user
//@path     POST /api/v1/auth/login
//@auth     Public
exports.loginUser = asyncHandler(async (req, res, next) => {
    console.log(req.body.password);
    const user = await User.findOne({ username: req.body.username }).select('+password');

    
    if(!user){
        return next(new ErrorResponse(`${req.body.username} does not exist`, 404));
    }

    
    let isMatch = await user.matchPassword(req.body.password);

    console.log(isMatch);

    // if(!isMatch) {
    //     return next(new ErrorResponse(`Password is incorrect`, 400));
    // }
    
    res.status(200).json({
        success: true,
        message: user
    });
});