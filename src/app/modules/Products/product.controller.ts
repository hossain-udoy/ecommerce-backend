import { Request, Response } from "express";
import { ProductService } from "./product.service";
import productValidationSchema from "./product.zod.validation";

// product created
const createProduct = async (req: Request, res: Response) => {
	try {
		const productData = req.body;
		// zod validation
		const zodParseData = productValidationSchema.parse(productData);
		
		const result = await ProductService.createProductInToDB(zodParseData);

		res.status(200).json({
			success: true,
			message: "Product created successfully!",
			data: result,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: "Something went wrong!",
			err,
		});
	}
};

// get all products from db
const getAllProducts = async (req: Request, res: Response) => {
	try {
		const result = await ProductService.getAllProductsFromDB();

		res.status(200).json({
			success: true,
			message: "Products fetched successfully!",
			data: result,
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			message: "Something went wrong when fatched data",
			err,
		});
	}
};

// get a product by id
const getAProduct = async (req: Request, res: Response) => {
	try {
		const { productId } = req.params;
		const result = await ProductService.getAProductFromDB(productId);
		res.status(200).json({
			success: true,
			message: "Product fetched successfully!",
			data: result,
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			message: "Something went wrong when fatched a product",
			err,
		});
	}
};

// update a product
const updateAProduct = async (req: Request, res: Response) => {
	try {
		const { productId } = req.params;
		const updateData = req.body;
		await ProductService.updateAProductFromDB(productId, updateData);

		res.status(200).json({
			success: true,
			message: "Product updated successfully!",
			data: updateData,
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			message: "Something went wrong when update a product",
			err,
		});
	}
};

// delete a product
const deleteAProduct = async (req: Request, res: Response) => {
	try {
		const { productId } = req.params;
		const result = await ProductService.deleteAProductFromDB(productId);
		res.status(200).json({
			success: true,
			message: "Product deleted successfully!",
			data: result,
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			message: "something went wrnog when deleted data",
			err,
		});
	}
};

// search by text
const searchProducts = async (req: Request, res: Response) => {
	try {
		const { searchTerm } = req.query;

		const result = await ProductService.searchProductsFromDB(
			searchTerm as string
		);
		res.status(200).json({
			success: true,
			message: `Products matching search term ${searchTerm} fetched successfully!`,
			data: result,
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			message: "something went wrnog when search data",
			err,
		});
	}
};

export const ProductController = {
	createProduct,
	getAllProducts,
	getAProduct,
	updateAProduct,
	deleteAProduct,
	searchProducts,
};
