const Cart = require('../model/cartModel');


module.exports = {
    //get all carts
    getAllCarts: (req, res) => {
        Cart.find({}, (error, products) => {
            if (error) return res.status(400).json({ message: "Cannot retrieve products!" });

            res.json({ products: products });
        })
    },

    //get cart by customer
    getProductsByCustomer: (req, res) => {
        const clientId = req.params.clientId;
        Cart.find({ userId: clientId }, (error, products) => {
            if (error) return res.render('error', { message: "Cannot retrieve products!" });

            res.render('cart', { title: "Cart", products: products });
        })
    },

    //add to cart
    addToCart: (req, res) => {
        const newCart = req.body;
        const cartTobeAdded = new Cart(newCart);
        cartTobeAdded.save((error, newlyAddedCart)=> {
            if(error) return res.render('error', {message: "Cannot add product!"});

            res.render('cart', {title:"cart", product: newlyAddedCart});
        });
    },

    //delete cart
    deleteCart: (req, res) => {
        const cartId = req.params.cartId;
        Cart.findByIdAndDelete(cartId, (error, cart)=> {
            if(error) return res.render("error", {message: "Cannot delete product!"})

            //temporary
            res.render('cart',{title: "Cart"});
        })
    }

}
