const router = require("express").Router();
const Category = require('../models/Category');
const userValidation = require('../validation/UserValidation');

//create category
router.post("/", async(req, res) => { //userValidation.verify, async(req, res) => {
    const newCategories = req.body.tags;
    try {
        const savedCategories = await Category.insertMany(newCategories, {ordered: false});
        res.status(200).json(savedCategories);
    } catch(error) {
        error.getWriteErrors().forEach(e => { //check for the expected "Duplicate Error" for tags that already exist
            if(e.code != 11000) {
                res.status(500).json({error: error});
            }
        });
    }
})

//get all published posts
router.get('/', async(req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch(error) {
        res.status(500).json(error);
    }
})

module.exports = router;