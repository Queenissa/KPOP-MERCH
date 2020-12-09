const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const rounds = 10;

module.exports = {
    addUser: (req, res) => {
        const newUser = req.body;
        bcrypt.hash(newUser["password"], rounds, (error, hashedPass) => {
            if (error) return res.send("Something went wrong!");
            newUser["password"] = hashedPass;
            const tobeAddUser = new User(newUser);
            tobeAddUser.save((error, user) => {
                if (error) return res.status(400).send(error);

                res.json({ message: "Successfully added!", user: user });
            });
        });

    },
    loginUser: (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        User.findOne({ email: email }, (error, user) => {
            if(!user) return res.status(400).json({message:"Email not found!"});
            if (error) return res.status(400).json({message:"Email not found!"});
            bcrypt.compare(password, user.password, (error, result) => {
                if (error) return res.status(400).json({message: "Password doesn't match!"});
                const accessToken = jwt.sign({ user }, process.env.ACCESS_SECRET, { expiresIn: '12h' });

                console.log(user);
                res.cookie("token", accessToken, { maxAge: 60000 * 60 * 12 });
                res.json({ message: "Successfully login!", user: user});
            })
        })
    }
}