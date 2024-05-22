import express, { Request, Response } from "express";
import { ProductController } from "./product.controller";

const router = express.Router();

// create a product
router.post("/", ProductController.createProduct);

// get all products
router.get("/", async (req: Request, res: Response) => {
	if (req.query.searchTerm) {
		// search a products
		await ProductController.searchProducts(req, res);
	} else {
		await ProductController.getAllProducts(req, res);
	}
});

// get a product
router.get("/:productId", ProductController.getAProduct);

// update a product
router.put("/:productId", ProductController.updateAProduct);

// deleted a product
router.delete("/:productId", ProductController.deleteAProduct);

export const ProductRoutes = router;
