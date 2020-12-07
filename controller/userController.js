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
            if (error) return res.send("Email not found!");
            bcrypt.compare(password, user.password, (match) => {
                if (!match) return res.send("Password doesn't match!");

                const accessToken = jwt.sign({ user }, process.env.ACCESS_SECRET, { expiresIn: '12h' });

                res.cookie("token", accessToken, { maxAge: 60000 * 60 * 12 });
                console.log(user);
                res.json({ message: "Successfully login!", user: user});
            })
        })
    }
}