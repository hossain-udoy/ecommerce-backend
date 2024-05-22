import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRoutes } from "./app/modules/Products/product.route";
import { OrderRoutes } from "./app/modules/Orders/order.route";

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());
app.use("/api/products/", ProductRoutes);
app.use("/api/orders/", OrderRoutes);

// Route not found handler here
app.use((req, res) => {
	res.status(404).json({
		success: false,
		message: "Route not found",
	});
});

const getAController = (req: Request, res: Response) => {
	const a = "Welcome to ecommerce server";
	res.send(a);
};
app.get("/", getAController);

export default app;
