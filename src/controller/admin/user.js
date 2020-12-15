const User = require('../../models/user.js');
const jwt = require('jsonwebtoken'); 
const { getHeapCodeStatistics } = require('v8');
const bcrypt = require('bcrypt');
const shortid = require('shortid'); 

const JWT_SECRET = "ecom-secret";

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
    .exec( async (error, user) => {
        if(user) return res.status(400).json({message:'admin already registered'});

        const { firstName, lastName, email, password } = req.body;
        const hash_password = await bcrypt.hash(password, 10); 
        const _user = new User({ firstName, lastName, email, hash_password, userName:shortid.generate(), role: 'admin' });

        _user.save((error,data) => {
            if(error){
                 return res.status(400).json({message:error});
            } else {
                return res.status(200).json({user:"admin created succesfully"});
            }
        });

    });
}

/*exports.signin = (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(422).json({error:"please enter admin email and pasword"});
    }

    User.findOne({ email: email })
        .then( (user) => {
            if(!user || user.role !== 'admin'){
                res.status(400).json({message:'enter admin credentials'})
            }
        bcrypt.compare(password, user.password)  
        .then(doMatch => {
            if(doMatch){
                const token = jwt.sign({_id: user._id, role: user.role}, JWT_SECRET);
                const { _id, firstName, lastName, email, role, fullName } = user; 
                res.status(200).json({
                    token,
                    user: {
                        _id, firstName, lastName, email, role, fullName
                    }
                })
            } else {
                res.status(400).json({message:'invalid user name or password'})
            }
        }).catch(err => {
            res.status(400).json({message:"error"})
        })
    })
}*/


exports.signin =  (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(422).json({error:"please enter email and pasword"});
    }
    User.findOne({email:email})
    .then(savedUser => {
        if(!savedUser || savedUser.role !== 'admin' ){
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
        
    
    
            

exports.signout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({message: 'sign out successfull'});
}

