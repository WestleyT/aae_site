const router = require("express").Router();
const User = require("../models/User");

//Update
router.put("/:id", async(req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            //need to make this a json web token for higher security
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {
                new: true
            });
            res.status(200).json(updatedUser);
        } catch(error) {
            res.status(500).json(error);
        }
    } else {
        res.status(401).json("You can only update your account");
    }
});

//Delete
router.delete("/:id", async(req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted");
        } catch(error) {
            res.status(500).json(error);
        }
    } else {
        res.status(401).json("You can only delete your account");
    }
});

//Get User
router.get("/:id", async(req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('userClass');
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    } catch(error) {
        res.status(500).json(error);
    }
});

//Get All Users
router.get("/", async(req, res) => {
    try {
        const users = await User.find().populate('userClass');
        res.status(200).json(users);
    } catch(error) {
        res.status(500).json(error);
    }
});

module.exports = router;