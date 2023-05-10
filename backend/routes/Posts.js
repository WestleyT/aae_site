const router = require("express").Router();
const User = require('../models/User');
const Post = require('../models/Posts');
const Category = require('../models/Category');
const userValidation = require('../validation/UserValidation');
const { default: mongoose } = require("mongoose");

//create post
router.post("/", userValidation.verify, async(req, res) => {
    const newPost = new Post(req.body);
    try {
        let savedPost;
        if (req.body.tags) {
            const savedCategories = await saveCategories(req.body.tags);
            newPost.tags = savedCategories;
            savedPost = await newPost.save();
        } else {
            savedPost = await newPost.save();
        }
        res.status(200).json(savedPost);
    } catch(error) {
        res.status(500).json(error);
    }
});

const saveCategories = async (categories) => {
    try {
        let existingIds = [];
        for (let i in categories) {
            if (categories[i]._id === '') {
                categories[i]._id = new mongoose.mongo.ObjectId();
            } else {
                existingIds.push(categories[i]._id);
            }
            categories[i] = {
                updateOne: {
                    filter: {_id: categories[i]._id},
                    update: categories[i],
                    upsert: true
                }
            }
        }
        const savedCategories = await Category.bulkWrite(categories);
        return Object.values(savedCategories.upsertedIds).concat(existingIds);
    } catch(error) {
        return error;
    }  
}

//update post
router.post("/:id", async (req, res) => {
    try {
        let updatedPost;
        if (req.body.tags) {
            const savedCategories = await saveCategories(req.body.tags);
            req.body.tags = savedCategories;
            updatedPost = await Post.findOneAndUpdate({_id: req.params.id}, req.body);
        } else {
            updatedPost = await Post.findOneAndUpdate({_id: req.params.id}, req.body);
        }
        res.status(200).json(updatedPost);
    } catch(error) {
        res.status(500).json(error);
    }
})

//get post by id
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('userId', 'firstName lastName').populate('tags');
        res.status(200).json(post);
    } catch(error) {
        res.status(500).json(error);
    }
})

//get all published posts
router.get('/', async(req, res) => {
    const catName = req.query.cat;
    try {
        let posts;
        if(catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName]
                },
            });
        } else {
            posts = await Post.find({published: true}, 'title tags publishDate').sort({publishDate: -1}).populate('tags');
        }
        res.status(200).json(posts);
    } catch(error) {
        res.status(500).json(error);
    }
})

//get all draft posts
router.get('/drafts/:userId', async (req, res) => {
    try {
        const posts = await Post.find({published: false, userId: req.params.userId}, 'title tags publishDate').populate('tags');
        res.status(200).json(posts);
    } catch(error) {
        res.status(500).json(error);
    }

})

module.exports = router;