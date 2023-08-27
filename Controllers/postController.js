const Post = require('../Models/Post')
const Tag = require('../Models/Tag')
const { ObjectId } = require('mongodb');


//CREATE POST
exports.addPost = async (req, res) => {

  try {
    const { title, desc, tags } = req.body;

    let addImage = [];
    if (req.files && req.files.length) {

      addImage = req.files.map((image) => {
        
        return image.path;
      });
    }
    console.log("addimage", addImage)
    const tagArray = tags.split(',').map(tag => tag.trim());

    const tagIds = [];
    for (const tagName of tagArray) {
      let tag = await Tag.findOne({ name: tagName });
      if (!tag) {
        tag = new Tag({ name: tagName });
        await tag.save();
      }
      tagIds.push(tag._id);
    }
    const baseUrl = 'https://demopostbackend.onrender.com'; 
const imageUrls = addImage.map(imagePath => `${baseUrl}/${imagePath}`);
    const post = new Post({
      title,
      desc,
      images: imageUrls,
      tags: tagIds,
    });

    await post.save();
    res.json(post);
  }
  catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

//GET POSTS
exports.getPosts = async (req, res) => {
  try {
    const { filter, sort, page, limit } = req.query;

    const filterOptions = filter ? {
      $or: [
        { title: { $regex: filter, $options: 'i' } },
        { desc: { $regex: filter, $options: 'i' } },
      ],
    } : {};

    const sortOptions = sort || '-createdAt';
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    const posts = await Post.find(filterOptions)
      .sort(sortOptions)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .populate('tags');

    if (posts.length === 0) {
      res.json({ message: `No post found matching with the ${filter}` })
    }
    else {
      res.json(posts);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }

}


//GET POSTS BY FILTERING THROUGH TAGS

exports.filterPostbyTags = async (req, res) => {
  try {
    const { tagName } = req.query;


    const tag = await Tag.findOne({ name: tagName });


    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    const posts = await Post.find({ tags: tag._id }).populate('tags');

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

