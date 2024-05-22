import { TProduct } from "./product.interface";
import { Product } from "./product.model";

// create product
const createProductInToDB = async (productData: TProduct) => {
	const result = await Product.create(productData);

	return result;
};

// get all products
const getAllProductsFromDB = async () => {
	const result = await Product.find();
	return result;
};

// get a product from db
const getAProductFromDB = async (id: string) => {
	const result = await Product.findOne({ _id: Object(id) });
	return result;
};

// update product
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateAProductFromDB = async (id: string, updateData: any) => {
	const result = await Product.updateMany({ _id: Object(id) }, updateData);
	return result;
};

// delete product from db
const deleteAProductFromDB = async (id: string) => {
	const result = await Product.deleteOne({ _id: id });
	return result;
};

// search data
const searchProductsFromDB = async (searchTerm: string) => {
	const result = await Product.find({ $text: { $search: searchTerm } });
	return result;
};

export const ProductService = {
	createProductInToDB,
	getAllProductsFromDB,
	getAProductFromDB,
	updateAProductFromDB,
	deleteAProductFromDB,
	searchProductsFromDB,
};
