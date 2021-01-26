const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");


const generateAccessToken = (username) => jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '3600s' });

exports.loginUser = (req, res) => {
    // read username and password from request body
    // console.log(req.query)
    const { username, password } = req.body;

    // filter user from the users array by username and password
    User.findUser(username, password, (error, user) => {
        console.log(error)
    if (user) {
        console.log(user)
        
        const accessToken = generateAccessToken({username: user.username, role: user.role_id})

        console.log(accessToken)
        jwt.verify(accessToken, process.env.TOKEN_SECRET, (err, success) => {
            if (err) {
                res.send(`Unable to verify token: ${error}`);
            }
            else {
                console.log('Successs ' + success)
                res.json({user_name: user.user_name, role: user.role_id, token: accessToken});
                // res.json(accessToken)
            }
    }); 

        // res.json({user_name: user.user_name, role: user.role_id, token: accessToken});
    } else {
        res.send(`Username or password incorrect: ${error}`);
    }
    });
};
