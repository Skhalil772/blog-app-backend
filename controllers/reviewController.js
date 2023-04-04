const Review = require("../models/Review");
const Post = require("../models/Post");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");
const createReview = async (req, res) => {
	const { post: postId } = req.body;
	const isValidPost = await Post.findOne({ _id: postId });
	if (!isValidPost) {
		throw new CustomError.NotFoundError(`No post with id : ${postId}`);
	}
	const alreadySubmitted = await Review.findOne({
		post: postId,
		user: req.user.name,
	});
	if (alreadySubmitted) {
		throw new CustomError.BadRequestError(
			"Already submitted review to this post"
		);
	}
	const { post, rating, title, comment } = req.body;
	req.body.user = req.user.name;
	const { userId } = req.user;
	console.log(userId);
	// const review = await Review.create({
	//   post,
	//   rating,
	//   title,
	//   comment,
	//   user: userId,
	// });
	const review = await Review.create(req.body);
	res.status(StatusCodes.CREATED).json({ review });
};
const getAllReview = async (req, res) => {
	const reviews = await Review.find({}).populate({
		path: "user",
		select: "name,email ",
	});
	res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};
const getSingleReview = async (req, res) => {
	const { id: reviewId } = req.params;

	const review = await Review.findOne({ _id: reviewId });

	if (!review) {
		throw new CustomError.NotFoundError(`No review with id ${reviewId}`);
	}

	res.status(StatusCodes.OK).json({ review });
};
const updateReview = async (req, res) => {
	const { id: reviewId } = req.params;
	const { rating, title, comment } = req.body;

	const review = await Review.findOne({ _id: reviewId });

	if (!review) {
		throw new CustomError.NotFoundError(`No review with id ${reviewId}`);
	}

	checkPermissions(req.user, review.user);

	review.rating = rating;
	review.title = title;
	review.comment = comment;

	await review.save();
	res.status(StatusCodes.OK).json({ review });
};
const deleteReview = async (req, res) => {
	const { id: reviewId } = req.params;

	const review = await Review.findOne({ _id: reviewId });

	if (!review) {
		throw new CustomError.NotFoundError(`No review with id ${reviewId}`);
	}

	checkPermissions(req.user, review.user);
	await review.remove();
	res.status(StatusCodes.OK).json({ msg: "Success! Review removed" });
};
const getSinglePostReview = async (req, res) => {
	const { id: postId } = req.params;
	const reviews = await Review.find({ post: postId });
	res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};
module.exports = {
	createReview,
	getAllReview,
	getSingleReview,
	updateReview,
	deleteReview,
	getSinglePostReview,
};
