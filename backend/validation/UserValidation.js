const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    return jwt.sign({id: user._doc._id, userClass: user._doc.userClass},
        'mysecretkey', //mysecretkey should be a long difficult string hidden in .env
        {expiresIn: '15m'}
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign({id: user._doc._id, userClass: user._doc.userClass},
        "myRefreshSecretKey"
    );
};

const verify = (req, res, next) => {
    console.log('request in verify ', req);
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, "mysecretkey", (err, user) => {
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

//just an example of what a request from frontend would look like
// await axios.delete('/users/' + id, {
//     headers: {authorization: "Bearer " + user.accessToken} //the api will splite Bearer off, reading only the access token  
// });



module.exports = {generateAccessToken, generateRefreshToken, verify};