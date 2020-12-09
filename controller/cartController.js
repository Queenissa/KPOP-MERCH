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
    getProductsByCustomer: async (req, res) => {
        const user = req.user;
        const clientId = req.params.clientId;
        Cart.find({ userId: clientId })
            .populate('productId')
            .populate('userId')
            .exec(async (error, products) => {
                if (error) return res.render('error', { message: "Cannot retrieve products!" });

                let uncheckout = filter(products, "uncheckout");
                let checkout = filter(products, "checkout");
                let delivered = filter(products, "delivered");

                let defCartstatus = {
                    uncheckout: uncheckout,
                    checkout: checkout,
                    delivered: delivered
                }
                console.log(defCartstatus);
                res.render('pages/cart', { title: "Cart", products: defCartstatus, user: user });
            })
    },

    //add to cart
    addToCart: (req, res) => {
        const newCart = req.body;
        const cartTobeAdded = new Cart(newCart);
        cartTobeAdded.save((error, newlyAddedCart) => {
            if (error) return res.render('error', { message: "Cannot add product!" });
            res.json({ message: "Successfully added!", product: newlyAddedCart });
        });
    },


    //delete cart
    deleteCart: (req, res) => {
        const cartId = req.params.cartId;
        Cart.findByIdAndDelete(cartId, (error, cart) => {
            if (error) return res.render("error", { message: "Cannot delete product!" })

            //temporary
            res.render('cart', { title: "Cart" });
        })
    },


    //update cart by id
    updateCartById: (req, res) => {
        const id = req.params.id;
        const updates = req.body;

        Cart.findByIdAndUpdate(id, { $set: updates }, (error, product) => {

            if (error) return res.status(400).render("error", { message: "Cannot update cart" });

            res.json({ message: "Updated" });
        });
    },

    //get order details admin side
    getOrderDatails: (req, res) => {
        Cart.find({ status: "checkout" })
            .populate('productId')
            .populate('userId')
            .exec((error, products) => {
                if (error) return res.render("error", { message: "Cannot retrieve the checkout carts!" });
                res.render('pages/orderDetails', { title: "Order Details", products: products });
            })
    }
}



// retrun an array form object

function filter(arr, data) {
    let newArr = [];
    for (let product of arr) {
        if (product.status == data) {
            newArr.push(product);
        }
    };
    return newArr;
}