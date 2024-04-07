const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
	buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	bidPrice: { type: Number },
	suborders: [
		{
			products: [],
			sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
			status: {
				type: String,
				enum: ["Pending", "Dispatched", "Canceled"],
				default: "Pending",
			},
		},
	],
	status: {
		type: String,
		enum: ["Pending", "Dispatched", "Canceled"],
		default: "Pending",
	},
	// Add other necessary fields related to the order
});

module.exports = mongoose.model("Order", orderSchema);
