const router = require("express").Router();
const User = require('../models/User');
const Post = require('../models/Posts');
const userValidation = require('../validation/UserValidation');

//create post
router.post("/", userValidation.verify, async(req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch(error) {
        res.status(500).json({error: error});
    }
})

//get post by id
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch(error) {
        res.status(500).json(error);
    }
})

//get all posts
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
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch(error) {
        res.status(500).json(error);
    }
})

module.exports = router;