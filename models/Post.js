const { default: mongoose } = require("mongoose");
const moogoose = require("mongoose");

const PostSchema = new moogoose.Schema({
	title: {
		type: String,
		require: true,
	},
	categories: {
		type: String,
		require: true,
	},
	content: {
		type: String,
		require: true,
	},

	date: {
		type: String,
		require: true,
	},
	user: {
		type: String,
		require: true,
	},

	image: {
		type: String,
		require: true,
	},
});

module.exports = mongoose.model("Post", PostSchema);
