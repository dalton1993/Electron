const Cart = require('../models/cart.js'); 

exports.addCartItem = (req, res) => {

    Cart.findOne({ user: req.user._id })
    
    .exec((error, cart) => {
        if(error) return res.status(400).json({message: error}); 
        if(cart) {
            //add to existing cart 
            const product = req.body.cartItems.product;     
            const cartItemExists = cart.cartItems.find(c => c.product == product);

            if(cartItemExists){
                Cart.findOneAndUpdate({"user": req.user._id, "cartItems.product": product}, {
                    "$set": {
                        "cartItems.$": {
                             ...req.body.cartItems, 
                            quantity: cartItemExists.quantity + req.body.cartItems.quantity 
                        }
                    }
                })
                .exec((error, updatedCart)=>{
                    if(error) return res.status(400).json({message:error});
                    if(updatedCart){
                        res.status(200).json({message:updatedCart});
                    }
                }); 
            } else {
                Cart.findOneAndUpdate({user: req.user._id}, {
                    "$push": {
                        "cartItems": [req.body.cartItems],
                    }
                })
                .exec((error, updatedCart)=>{
                    if(error) return res.status(400).json({message:error});
                    if(updatedCart){
                        res.status(200).json({message:updatedCart});
                    }
                })
            }

           // res.status(200).json({message:cart});
        } else {
            //create a new cart 
            const cart = new Cart({
                user: req.user._id,
                cartItems: req.body.cartItems
            });
        
            cart.save((error, savedCart)=>{
                if(error) return res.status(400).json({message:error})
                if(savedCart){
                    res.status(200).json({ savedCart })
                }
            })
        }
    });
}

exports.getCart = (req, res) => {
    Cart.findOne({user: req.user._id}).populate('cartItems.product', 'name price description catagory productPictures')
    .then( result => { 
        res.status(200).json(result)
    })
    .catch( err => {
        console.log(err)
        res.status(400).json(err);
    });
}

exports.editCartQuant = (req, res) => {

    Cart.findOne({ user: req.user._id })
    
    .exec((error, cart) => {
        if(error) return res.status(400).json({message: error}); 
        if(cart) {
            //add to existing cart 
            const product = req.body.cartItems.product;     
            const cartItemExists = cart.cartItems.find(c => c.product == product);

            if(cartItemExists){
                Cart.findOneAndUpdate({"user": req.user._id, "cartItems.product": product}, {
                    "$set": {
                        "cartItems.$": {
                             ...req.body.cartItems, 
                            quantity: req.body.cartItems.quantity 
                        }
                    }
                })
                .then( (result) => {
                    res.status(200).json(result)
                })
                .catch( (err) => {
                    console.log(err)
                    res.status(400).json(err);
                })
            }
        }
    })
}

exports.deleteCartItem = ( req, res ) => {
        Cart.findOneAndUpdate({'user':req.user._id}, 
            { $pull: { "cartItems": {_id:req.body.id} } }, {new:true}
        )
        .then(result => {
            res.status(200).json(result)
        })
        .catch( err => {
            res.status(400).json(err)
        })
}