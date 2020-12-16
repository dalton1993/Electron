const jwt = require('jsonwebtoken'); 
const {JWT_SECRET} = require('../../config/keys');

exports.userMiddleware = (req, res, next) => {
    if(req.user.role !== 'user'){
        return res.status(400).json({message:' user access denied'});
    }
    next(); 
}

exports.adminMiddleware = (req, res, next) => {
    if(req.user.role !== 'admin'){
        return res.status(400).json({message:'admin access denied'});
    }
    next(); 
}

exports.requireSignIn = (req, res, next) => {
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1]; 
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
        console.log(user);
        } else {
            return res.status(400).json({message:'Authorization required'})
        }
        next();
    }