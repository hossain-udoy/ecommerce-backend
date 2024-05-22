import { Schema, model } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>({
	email: {
		type: String,
		required: [true, "Email is required"],
	},
	productId: {
		type: String,
		required: [true, "Product ID is required"],
	},
	price: {
		type: Number,
		required: [true, "Price is required"],
	},
	quantity: {
		type: Number,
		required: [true, "Quantity is required" ],
	},
});

export const Order = model<TOrder>("Order", orderSchema);
