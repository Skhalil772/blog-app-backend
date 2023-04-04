const express = require("express");
const router = express.Router();
const {
	authenticateUser,
	authorizePermissions,
} = require("../middleware/authentication");
const {
	getAllPosts,
	createPost,
	uploadPostImage,
	deletePost,
	updatePost,
	getSinglePost,
} = require("../controllers/postController");
const { getSinglePostReview } = require("../controllers/reviewController");

router.route("/").post(createPost).get(getAllPosts);
router.route("/:id/review").get(getSinglePostReview);
router.route("/uploads").post(uploadPostImage);

// router.route("/:category").get(getAllPostsbyCat);
router.route("/:id").get(getSinglePost).delete(deletePost).patch(updatePost);

// router
// 	.route("/")
// 	.patch([authenticateUser, authorizePermissions("admin")], updatePost)
// 	.delete([authenticateUser, authorizePermissions("admin")], deletePost);

module.exports = router;
