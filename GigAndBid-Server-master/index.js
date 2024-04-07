const express = require("express");
const mongoose = require("mongoose");
const cron = require("cron");
const multer = require("multer");
const http = require("http");
const moment = require("moment");
const bcrypt = require("bcrypt");
const Product = require("./Schemas/Product");
const Order = require("./Schemas/Order");

const app = express();

app.use(express.json());

mongoose
	.connect("mongodb+srv://gbDB:gbfyp@cluster0.phvasnb.mongodb.net/?retryWrites=true&w=majority", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to MongoDB"))
	.catch((error) => console.error("MongoDB connection error:", error));

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/"); // Specify the directory to store the uploaded files
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname); // Set the filename for the uploaded file
	},
});
const upload = multer({ storage: storage });

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	phone: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	address: { type: String, required: true },
	city: { type: String, required: true },
	type: { type: Number, required: true },
});

const User = mongoose.model("Users", userSchema);
app.use("/uploads", express.static("uploads"));
app.post("/signup", async (req, res) => {
	const { name, phone, email, password, address, city, type } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({ name, phone, email, address, city, password: hashedPassword, type });
		await newUser.save();

		res.status(201).json(newUser);
	} catch (error) {
		console.error("Error during signup:", error);
		res.status(500).json({ message: "Error during signup" });
	}
});

app.post("/login", async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		res.status(200).json(user);
	} catch (error) {
		console.error("Error during login:", error);
		res.status(500).json({ message: "Error during login" });
	}
});

app.post("/product", upload.single("image"), async (req, res) => {
	try {
		const imageUrl = req.file.path;
		const product = await Product.create({ ...req.body, imageUrl });
		res.status(201).json(product);
	} catch (error) {
		console.error("Error creating product:", error);
		res.status(500).json({ message: "Error creating product" });
	}
});

app.get("/products", async (req, res) => {
	try {
		const products = await Product.find();
		res.status(200).json(products);
	} catch (error) {
		console.error("Error retrieving products:", error);
		res.status(500).json({ message: "Error retrieving products" });
	}
});

app.post("/products/my-products", async (req, res) => {
	const { userId } = req.body;

	try {
		const myProducts = await Product.find({ createdBy: userId });

		res.status(200).json(myProducts);
	} catch (error) {
		console.error("Error retrieving products:", error);
		res.status(500).json({ message: "Error retrieving products" });
	}
});

app.delete("/products/:productId", async (req, res) => {
	const { productId } = req.params;

	try {
		const deletedProduct = await Product.findByIdAndDelete(productId);

		if (!deletedProduct) {
			return res.status(404).json({ message: "Product not found" });
		}

		res.status(200).json({ message: "Product deleted successfully" });
	} catch (error) {
		console.error("Error deleting product:", error);
		res.status(500).json({ message: "Error deleting product" });
	}
});

app.post("/order", async (req, res) => {
	try {
		const { products, buyer } = req.body;
		const bidPrice = req.body?.bidPrice || 0;
		const order = new Order({
			buyer,
			bidPrice,
		});

		const savedOrder = await order.save();

		const suborders = [];

		for (const product of products) {
			console.log(product);
			const productDetail = await Product.findById(product.id);

			if (!productDetail) {
				return res.status(404).json({ error: "Product not found" });
			}

			const suborder = {
				product: productDetail,
				seller: productDetail.createdBy,
				quantity: product.quantity,
			};

			suborders.push(suborder);
		}
		const sellersWithProducts = suborders.reduce((result, suborder) => {
			const { seller, product, quantity } = suborder;

			if (!result[seller]) {
				result[seller] = {
					sellerId: seller,
					products: [],
				};
			}

			result[seller].products.push({
				productId: product,
				quantity,
			});

			return result;
		}, {});

		const sellersArray = Object.values(sellersWithProducts);

		savedOrder.suborders = sellersArray;
		await savedOrder.save();

		res.status(201).json(savedOrder);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to place order" });
	}
});

app.get("/seller-orders/:sellerId", async (req, res) => {
	try {
		const { sellerId } = req.params;

		const myorders = await Order.find().select("suborders").lean();

		const suborders = myorders.reduce((result, order) => {
			const sellerSuborders = order.suborders.filter((suborder) => suborder.sellerId.toString() === sellerId);
			result.push(...sellerSuborders);
			return result;
		}, []);

		res.json(suborders);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch orders" });
	}
});
app.get("/buyer-order/:buyerId", async (req, res) => {
	try {
		const { buyerId } = req.params;

		const orders = await Order.find({ buyer: buyerId });

		res.json(orders);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch orders" });
	}
});

app.delete("/order/:orderId", async (req, res) => {
	try {
		const { orderId } = req.params;

		const deletedOrder = await Order.findByIdAndDelete(orderId);

		if (!deletedOrder) {
			return res.status(404).json({ error: "Order not found" });
		}

		res.json({ message: "Order deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: "Failed to delete order" });
	}
});

app.put("/order", async (req, res) => {
	try {
		const { suborderId, status } = req.body;

		const order = await Order.findOne({ "suborders._id": suborderId });

		if (!order) {
			return res.status(404).json({ error: "Order or suborder not found" });
		}

		const suborder = order.suborders.find((sub) => sub._id.toString() === suborderId);
		if (!suborder) {
			return res.status(404).json({ error: "Suborder not found" });
		}
		suborder.status = status;
		const allDelivered = order.suborders.every((sub) => sub.status === "Dispatched");
		if (allDelivered) {
			order.status = "Dispatched";
		}

		await order.save();

		res.json({ message: "Suborder status updated successfully" });
	} catch (error) {
		res.status(500).json({ error: "Failed to update suborder status" });
	}
});
app.post("/bid", async (req, res) => {
	// Extract bid details from the request body
	const { productId, amount, buyerId } = req.body;
	const product = await Product.findOne({ _id: productId });
	const buyer = await User.findOne({ _id: buyerId });
	const bid = {
		amount,
		buyer,
	};
	product.bids.push(bid);
	await product.save();
	// Perform any validation or processing of the bid details here

	// Save the bid to the database or perform any other necessary operations
	// Adjust this code to match your database or data storage approach

	// Respond with a success message
	res.json({ message: "Bid placed successfully", body: { bid } });
});

app.get("/bidWinner", async (req, res) => {
	try {
		const products = await Product.find({ bidStatus: "Active", biddable: true });

		if (products.length > 0) {
			const currentDateTime = moment();
			const activeProducts = products.filter((product) => moment(product.bidEndAt).isBefore(currentDateTime));
			if (activeProducts.length > 0) {
				activeProducts.forEach(async (product) => {
					const topBidder = await getTopBidder(product._id);
					await placeOrderBid(topBidder, product._id);
					product.bidWinner = topBidder;
					product.bidStatus = "Closed";
					await product.save();
				});
			}
		}
		res.json({ message: "Bid winner fetched successfully", body: { products } });
	} catch (error) {
		console.error("Error fetching bid winner:", error);
		res.status(500).json({ error: "Error fetching bid winner" });
	}
});

async function getTopBidder(productId) {
	const product = await Product.findById(productId);
	if (product.bids.length > 0) {
		product.bids.sort((a, b) => b.amount - a.amount); // Sort bids in descending order of amount
		return product.bids[0]; // Return the bidderId of the top bidder
	}
	return null; // No bids found for the product
}

async function placeOrderBid(topBidder, productId) {
	const postData = JSON.stringify({
		buyer: topBidder.buyer._id,
		bidPrice: topBidder.amount,
		products: [
			{
				id: productId,
				quantity: 1,
			},
		],
	});
	console.log(postData);
	// return;
	const options = {
		hostname: "localhost",
		port: 3000,
		path: "/order",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Content-Length": Buffer.byteLength(postData),
		},
	};

	const req = http.request(options, (res) => {
		console.log("Order request status code:", res.statusCode);

		res.on("data", (chunk) => {
			// Process the response data if needed
		});

		res.on("end", () => {
			// Called when the response ends
		});
	});

	req.on("error", (error) => {
		console.error("Error making order request:", error);
	});

	req.write(postData); // Send the POST data
	req.end(); // Close the request
}
const cronJob = new cron.CronJob("* * * * *", function () {
	// This function will be executed every minute
	// Make a GET request to the bid winner check route
	// Adjust the URL and method as per your setup
	require("http").get("http://localhost:3000/bidWinner", function (res) {
		console.log("Bid winner check response:", res.statusCode);
	});
});

cronJob.start();

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
