import { Request, Response } from "express";
import orderValidationSchema from "./order.zod.validation";
import { OrderService } from "./order.service";
import { ProductService } from "../Products/product.service";

// order create
const orderCreate = async (req: Request, res: Response) => {
	try {
		const orderData = req.body;
		const zodParseData = orderValidationSchema.parse(orderData);
		const { productId, quantity } = orderData;
		const getAProduct = await ProductService.getAProductFromDB(productId);
		const { inventory } = getAProduct;

		if (quantity <= inventory.quantity) {
			const updateQuantity = inventory.quantity - quantity;
			if (updateQuantity === 0) {
				const res = {
					quantity: updateQuantity,
					inStock: false,
				};

				return ProductService.updateAProductFromDB(productId, {
					inventory: res,
				});
			} else {
				inventory.quantity = updateQuantity;
				ProductService.updateAProductFromDB(productId, { inventory });

				const result = await OrderService.createOrderIntoDB(zodParseData);

				res.status(200).json({
					success: true,
					message: "Order created successfully!",
					data: result,
				});
			}
		} else {
			res.status(400).json({
				success: false,
				message: "Insufficient quantity available in inventory",
			});
		}
	} catch (err) {
		res.status(500).json({
			success: false,
			message: "Something went wrong when order",
		});
	}
};

// get all orders
const getAllOrders = async (req: Request, res: Response) => {
	try {
		const result = await OrderService.getAllOrderInToDB();
		res.status(200).json({
			success: true,
			message: "Orders fetched successfully!",
			data: result,
		});
	} catch (err) {
		res.status(500).json({
			success: true,
			message: "Something went wrong orders get data",
			err,
		});
	}
};

// get orders by email
const getOrdersByEmail = async (req: Request, res: Response) => {
	const { email } = req.query;
	try {
		const result = await OrderService.getOrdersByEmailInToDB(email as string);
		if (result.length === 0) {
			res.status(404).json({
				success: false,
				message: "Order not found",
			});
			return;
		}
		res.status(200).json({
			success: true,
			message: "Orders fetched successfully for user email!",
			data: result,
		});
	} catch (err) {
		res.status(500).json({
			success: true,
			message: "Something went wrong when get data by email",
			err,
		});
	}
};

export const OrderController = {
	orderCreate,
	getAllOrders,
	getOrdersByEmail,
};
