import { z } from "zod";

  const VariantValidationSchema = z.object({
	type: z.string().nonempty("Variant type is required"),
	value: z.string().nonempty("Variant value is required"),
});

  const InventoryValidationSchema = z.object({
	quantity: z.number().min(0, "Quantity must be a non-negative number"),
	inStock: z.boolean().default(true),
});

 const productValidationSchema = z.object({
	name: z.string().nonempty("Product name is required"),
	description: z.string().nonempty("Product description is required"),
	price: z.number().min(0, "Price must be a non-negative number"),
	category: z.string().nonempty("Product category is required"),
	tags: z.array(z.string()).default([]),
	variants: z.array(VariantValidationSchema).default([]),
	inventory: InventoryValidationSchema,
});

export default productValidationSchema