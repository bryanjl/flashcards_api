const User = require('../models/User');
const asyncHandler = require('../middleware/async');

//@desc     Register a new user
//@path     POST /api/v1/auth/register
//@auth     Public
exports.registerUser = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'Path for registering a new user'
    });
});

//@desc     Login a new user
//@path     POST /api/v1/auth/login
//@auth     Public
exports.loginUser = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'Path for logging in'
    });
});