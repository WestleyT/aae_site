const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const userValidation = require('../validation/UserValidation');

//Register
router.post("/register", async(req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            userClass: req.body.userClass,
            profilePicture: req.body.profilePicture
        })

        const user = await newUser.save();
        res.status(200).json(user);
    } catch(error) {
        res.status(500).json(error);
    }
});

//Login
router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        !user && res.status(400).json("username or password is incorrect");

        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json('username or password is incorrect');

        const accessToken = userValidation.generateAccessToken(user);
        const refreshToken = userValidation.generateRefreshToken(user);

        const {password, ...others} = user._doc;
        const responseObj = {...others, accessToken, refreshToken}
        res.status(200).json(responseObj);
    } catch(error) {
        res.status(500).json({error: error});
    }
});

let refreshTokens = [];

router.post("/refresh", (req, res) => {
    const refreshToken = req.body.token;

    //send error if no token, or it's invalid
    if (!refreshToken) {
        return res.status(401).json("You are not authenticated");
    }
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json("Invalid token");
    }

    jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
        err && console.log(err);

        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

        const newAccessToken = userValidation.generateAccessToken(user);
        const newRefreshToken = userValidation.generateRefreshToken(user);

        refreshTokens.push(newRefreshToken);

        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        })
    })
});

module.exports = router