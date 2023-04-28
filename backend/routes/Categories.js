const router = require("express").Router();
const Category = require('../models/Category');
const userValidation = require('../validation/UserValidation');

//create category
router.post("/", async(req, res) => { //userValidation.verify, async(req, res) => {
    const newCategories = req.body.tags;
    try {
        const savedCategories = await Category.insertMany(newCategories);
        res.status(200).json(savedCategories);
    } catch(error) {
        res.status(500).json({error: error});
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