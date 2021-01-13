const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

// Secret Token
const accessTokenSecret = require('crypto').randomBytes(64).toString('hex');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

exports.loginUser = (req, res) => {
    // read username and password from request body

    const { username, password } = req.body;

    User.testFunc()
    // filter user from the users array by username and password
    User.findUser(username, password, (error, user) => {
    if (user) {
        // generate an access token
        const a = '1f94b3feb339e39e65671cddbc66e7752ce7263a4b3da9247ddaa99f68ffa1a4093ac65f4d73bdbc1d4f5a7ee1ab7843ae634e15567239d52cd836d1a83cc426'
        const accessToken = jwt.sign({username: user.username}, a);
        // const refreshToken = jwt.sign({ username: user.username, role: user.role_id }, refreshTokenSecret);

        // refreshTokens.push(refreshToken);
        console.log(accessToken)
        console.log(a)
        jwt.verify(accessToken, a, (err, success) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log('Successs ' + success)
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