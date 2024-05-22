import { Schema, model } from "mongoose";
import { TProduct } from "./product.interface";

const variantSchema = new Schema({
	type: { type: String, required: true },
	value: { type: String, required: true },
});

const inventorySchema = new Schema({
	quantity: { type: Number, required: true },
	inStock: { type: Boolean, default: true },
});

const productSchema = new Schema<TProduct>({
	name: { type: String, required: [true, "Product name is required"] },
	description: {
		type: String,
		required: [true, "Product description is required"],
	},
	price: { type: Number, required: [true, "Product price is required"] },
	category: { type: String, required: [true, "Product category is required"] },
	tags: { type: [String], default: [] },
	variants: { type: [variantSchema], default: [] },
	inventory: { type: inventorySchema, required: true },
});

export const Product = model<TProduct>("Product", productSchema);
