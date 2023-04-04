const Post = require("../models/Post");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const CustomError = require("../errors");

const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const createPost = async (req, res) => {
	// req.body.user = req.user.name;

	const post = await Post.create(req.body);
	res.status(StatusCodes.CREATED).json({ post });
};
const getAllPosts = async (req, res) => {
	const postsList = await Post.find({});
	res.status(StatusCodes.OK).json(postsList);
};
const getAllPostsbyCat = async (req, res) => {
	const { category } = req.params;
	const postsList = await Post.find({ categories: category });

	res.status(StatusCodes.OK).json({ postsList });
};
const uploadPostImage = async (req, res) => {
	const result = await cloudinary.uploader.upload(
		req.files.image.tempFilePath,
		{
			use_filename: true,
			folder: "nh-images",
		}
	);

	console.log(result.url);
	fs.unlinkSync(req.files.image.tempFilePath);
	return res.status(StatusCodes.OK).json({ image: result.secure_url });
	// res.send("hello");
};
const test = async (req, res) => {
	res.send("hello");
	console.log(req.body);
};
const getSinglePost = async (req, res) => {
	const { id: postId } = req.params;
	console.log(postId);

	const post = await Post.findById(postId);

	if (!post) {
		throw new CustomError.NotFoundError(`No post with id : ${postId}`);
	}

	res.status(StatusCodes.OK).json({ post });
	// res.send("hello");
};
const updatePost = async (req, res) => {
	const { id: postId } = req.params;

	const post = await Post.findOneAndUpdate({ _id: postId }, req.body, {
		new: true,
		runValidators: true,
	});

	if (!post) {
		throw new CustomError.NotFoundError(`No post with id : ${postId}`);
	}

	res.status(StatusCodes.OK).json({ post });
};
const deletePost = async (req, res) => {
	const { id: postId } = req.params;

	const post = await Post.findOne({ _id: postId });

	if (!post) {
		throw new CustomError.NotFoundError(`No post with id : ${postId}`);
	}

	await post.remove();
	res.status(StatusCodes.OK).json({ msg: "Success! Post removed." });
};

module.exports = {
	uploadPostImage,
	getAllPosts,
	createPost,
	deletePost,
	updatePost,
	getSinglePost,
	getAllPostsbyCat,
	test,
};
