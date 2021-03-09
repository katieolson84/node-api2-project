// implement your posts router here
const express = require('express');

const router= express.Router();

const Post= require('./posts-model');

// Get Posts
router.get('/', (req,res) => {
    Post.find(req.query)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({
            message: ("The posts information could not be retrieved", err)
        })
    })
})

//Get Post by Id
router.get('/:id', (req,res) => {
    Post.findById(req.params.id)
    .then(posts => {
        if(posts) {
            res.status(200).json(posts);
        }else{
            res.status(404).json({
                message: ("The post with the specified ID does not exist")
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: ("The post information could not be retrieved", err)
        })
    })
})

// POST new Post
router.post('/', (req,res) => {
    const newPost= req.body
    if (!newPost.title || !newPost.contents){
        res.status(400).json({message: "Please provide title and contents for the post"})
    }else{
        Post.insert(newPost)
        .then(posts => {
            res.status(201).json(posts)
        })
        .catch(err => {
            res.status(500).json({
                message: ("There was an error while saving the post to the database", err)
            })
        })
    }
})

// PUT update posts


module.exports = router