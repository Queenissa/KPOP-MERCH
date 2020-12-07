const jwt = require('jsonwebtoken');

module.exports = {
    //authorized user
    authorizedData: (req, res, next) => {
        const token = req.cookies.token;
        if(token) {
            jwt.verify(token, process.env.ACCESS_SECRET, (error, user)=> {
                if(error) return res.statusCode(401);

                req.user = user;
                next();
            })
        }else {
            res.redirect('/');
        }
    },

    //avoid routes
    removeToken: (req, res, next)=> {
        const token = req.cookies.token;
        if(token){
            res.clearCookie('token');
        }
        next();
    },


    //check admin
    isAdmin: (req, res, next) => {
        const user = req.user.user;
        if(user.role != "admin"){
            return res.redirect(`/welcome/${user._id}/${user.role}`);
        }
        next();
    }
    
}