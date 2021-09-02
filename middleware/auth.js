const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');

exports.protect = asyncHandler(async (req, res, next) => {
    let token = req.headers.authorization;
    
    if(token.startsWith('Bearer')){
        token = token.split(' ')[1];
        let decodedToken = jwtDecode(token);
        req.user = decodedToken.id;
        console.log(req.user);
    }

    next();
});

function jwtDecode(token) {
    let payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload;
}