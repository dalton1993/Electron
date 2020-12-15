const User = require('../models/user.js');
const jwt = require('jsonwebtoken'); 
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt'); 
const shortid = require('shortid');

const JWT_SECRET = "ecom-secret";

exports.signup = (req, res) => {
    
    User.findOne({ email: req.body.email })
    .exec(async (error, user) => {
        if(user) return res.status(400).json({message:'user already registered'});
        
        const { firstName, lastName, email, password } = req.body;
        const hash_password = await bcrypt.hash(password, 10);
        const _user = new User({ firstName, lastName, email, hash_password, userName: shortid.generate(), role: 'user' });

        _user.save((error,data) => {
            if(error){
                 return res.status(400).json({message:error});
            } else {
                return res.status(200).json({message:data});
            }
        });

    });
}

/*exports.signin = (req, res) => {
    User.findOne({ email:req.body.email })
    .exec((error, user) => {
        if(error) return res.status(400).json({ error });
        if(user) {
            if(user.authenticate(req.body.password) && user.role === 'user'){
                const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET)
                const { _id, firstName, lastName, email, role, fullName } = user; 
                res.status(200).json({
                    token,
                    user: {
                        _id, firstName, lastName, email, role, fullName
                    }
                })
            } else {
                return res.status(400).json({message:"Invalid password"})
            }
        } else {
            return res.status(400).json({message:"something went wrong"})
        }
    }) 
}*/

exports.signin =  (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    if(!email || !password){
        res.status(422).json({error:"please enter email and pasword"});
    }
    User.findOne({email:email})
    .then(savedUser => {
        if(!savedUser || savedUser.role !== 'user' ){
           return res.status(422).json({error:"invalid email or password"})
        }
        bcrypt.compare(password, savedUser.hash_password)
        .then(doMatch => {
            if(doMatch){
                const token = jwt.sign({ _id: savedUser._id, role: savedUser.role}, JWT_SECRET )
                // res.json({message:"succesfully signed in"})
                const { _id, firstName, lastName, email, role, fullName } = savedUser
                res.json({token:token, user: { _id, firstName, lastName, email, role, fullName }})
            } else {
                return res.status(422).json({error:"invalid email or password"})
            }
        })
        .catch(err => {
            console.log(err)
        })
    })
};       

exports.requireSignIn = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]; 
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
}
