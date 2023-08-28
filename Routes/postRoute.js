const express = require('express')
const{addPost, getPosts, filterPostbyTags} = require('../Controllers/postController')
const{upload_Post} = require('../multer')
const cloudinary = require('cloudinary')

const router = new express.Router()

router.post('/add', upload_Post.array('postimages'), addPost) //API ENDPOINT TO CREATE A POST
router.get('/get', getPosts ) // API ENDPOINT TO GET ALL POSTS USING FILTERING, PAGINATION, SORTING IN QUERY
router.get('/get/getbytag', filterPostbyTags) // API ENDPOINT TO GET POSTS BY FILTERING THROUGH TAGS

module.exports = router