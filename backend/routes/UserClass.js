const router = require("express").Router();
const UserClass = require("../models/UserClass");
const bcrypt = require("bcrypt");

//create new user class
router.post("/", async(req, res) => {
    const newClass = new UserClass(req.body);
    console.log(newClass);
    try {
        const savedClass = await newClass.save();
        res.status(200).json(savedClass);
    } catch(error) {
        console.log('error ', error);
        res.status(500).json(error);
    }
});

//get all user classes
router.get('/', async(req, res) => {
    try {
        const userClasses = await UserClass.find();
        res.status(200).json(userClasses);
    } catch(error) {
        res.status(500).json(error);
    }
})

module.exports = router;