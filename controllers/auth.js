const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');

//@desc     Register a new user
//@path     POST /api/v1/auth/register
//@auth     Public
exports.registerUser = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);
    
    jwtResponse(user, 201, res);
});

//@desc     Login a new user
//@path     POST /api/v1/auth/login
//@auth     Public
exports.loginUser = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username }).select('+password');

    if(!user){
        return next(new ErrorResponse(`${req.body.username} does not exist`, 404));
    }

    const isMatch = await user.matchPassword(req.body.password);

    if(!isMatch) {
        return next(new ErrorResponse(`Password is incorrect`, 400));
    } 

    jwtResponse(user, 200, res);
});

//@desc     Get current logged in user
//@path     GET /api/v1/auth/getme
//@auth     Public
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user);

    if(!user){
        return next(new ErrorResponse(`User not found`, 404));
    }

    res
        .status(200)
        .json({
            success: true,
            user
        });
});

const jwtResponse = async function(user, statusCode, res) {
    const token = await user.signJWT();

    res 
        .status(statusCode || 200)
        .json({
            success: true,
            token
        });
}