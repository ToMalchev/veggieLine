const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");


const generateAccessToken = (username) => {
    const accessToken = jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '3600s' });
};

exports.loginUser = (req, res) => {
    // read username and password from request body

    const { username, password } = req.body;

    // filter user from the users array by username and password

    User.findUser(username, password, (error, user) => {
    if (user) {
        
        const accessToken = generateAccessToken({username: user.username, role: user.role_id})
        // const accessToken = jwt.sign({username: user.username, role: user.role_id}, process.env.TOKEN_SECRET, {});
        // const refreshToken = jwt.sign({ username: user.username, role: user.role_id }, refreshTokenSecret);

        // refreshTokens.push(refreshToken);

        jwt.verify(accessToken, a, (err, success) => {
            if (err) {
                res.send(`Error verify: ${error}`);
            }
            else {
                console.log('Successs ' + success)
                // res.json(accessToken)
            }
    }); 

        res.json(accessToken);
    } else {
        res.send(`Username or password incorrect: ${error}`);
    }
    // const user = users.find(u => { return u.username === username && u.password === password });
    });
};

// exports.token = (req, res) => {

// };