const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	imageUrl: { type: String, required: true },
	name: { type: String, required: true },
	price: { type: Number, required: true },
	description: { type: String, required: true },
	address: { type: String, required: true },
	biddable: { type: Boolean, required: true },
	createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	category: { type: String, required: true },
	bids: [],
	bidStatus: {
		type: String,
		enum: ["Active", "Closed"],
		default: "Active",
	},
	bidWinner: {},
	bidEndAt: { type: String },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
