const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReviewSchema = new mongoose.Schema(
	{
		rating: {
			type: Number,
			min: 1,
			max: 5,
			required: [true, "Please provide rating"],
		},
		title: {
			type: String,
			trim: true,
			required: [true, "Please provide review title"],
			maxlength: 100,
		},
		comment: {
			type: String,
			required: [true, "Please provide review comment"],
		},
		user: {
			type: String,

			required: true,
		},
		post: {
			type: String,

			required: true,
		},
	},
	{
		timestamps: true,
	}
);
ReviewSchema.index({ post: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Review", ReviewSchema);
