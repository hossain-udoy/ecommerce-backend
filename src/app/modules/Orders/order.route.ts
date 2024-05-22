import express, { Request, Response } from "express";
import { OrderController } from "./order.controller";

const router = express.Router();

// create order
router.post("/", OrderController.orderCreate);
// get all orders
router.get("/", async (req: Request, res: Response) => {
	if (req.query.email) {
		OrderController.getOrdersByEmail(req, res);
	} else {
		await OrderController.getAllOrders(req, res);
	}
});

export const OrderRoutes = router;
