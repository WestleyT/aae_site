const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    return jwt.sign({id: user._doc._id, userClass: user._doc.userClass},
        process.env.TOKEN_KEY,
        {expiresIn: '30m'}
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign({id: user._doc._id, userClass: user._doc.userClass},
        process.env.REFRESH_KEY
    );
};

const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
            if (err) {
                return res.status(403).json("Invalid token");
            }

            req.user = user;
            next();
        });
    } else {
        res.status(401).json("You are not authenticated!");
    }
};

module.exports = {generateAccessToken, generateRefreshToken, verify};