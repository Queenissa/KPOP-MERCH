const Product = require('../model/productModel');
const User = require('../model/userModel');

module.exports = {
    //get 
    getIndexAndproducts: (req, res)=> {
        const userId = req.params.userId;

        Product.find({}, (error, products)=> {
            if(error) return res.render("error",{title: "Error", message: "Retrieve products failed!"});

            if(!userId){
                return res.render('pages/index', {title: "Kpop Merch", products: products, user: undefined});
            }
            User.findById(userId, (error, user)=> {
                if(error) return res.status(400).json({message: "test"});
                res.render('pages/index', {title: "Home", products: products, user: user});
            })
           
        })
    },

    //get product by categories
    getProductsByCategory: (req, res)=> {
        const category = req.params.category;
     
        Product.find({category: category}, (error, products)=> {
            if(error) return res.render("error",{title: "Error", message: "Retrieve products "+category+" failed!"});

            res.render("pages/categories", {title: `Categories| ${category}`, products: products, user: req.user});
        });
    },

    //get add product page
    getAddProductForm: (req, res)=> {
        res.render('pages/addProduct');
    },  

    //add product 
    addProduct: (req, res)=> {
        const newProduct = req.body;

        const productTobeAdd = new Product(newProduct);
        //save the product
        productTobeAdd.save((error, newlyAddedProduct)=> {
            if(error) return res.status(400).json({title: "Error", message: "Failed to add product!"});
            res.json({url: `/categories/${newlyAddedProduct.category}`});
        });
    }
}
