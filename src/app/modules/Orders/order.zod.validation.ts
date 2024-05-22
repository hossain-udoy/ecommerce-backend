import { z } from "zod";

 const orderValidationSchema = z.object({
	email: z.string().nonempty("Email is required").email("Invalid email format"),
	productId: z.string().nonempty("Product ID is required"),
	price: z
		.number()
		.min(0, "Price must be a non-negative number")
		.nonnegative("Price must be a non-negative number"),
	quantity: z
		.number()
		.min(1, "Quantity must be at least 1")
		.int("Quantity must be an integer"),
});

export default orderValidationSchema
