import { TOrder } from "./order.interface";
import { Order } from "./order.model";


// create order 
const createOrderIntoDB = async (orderData:TOrder) => {
    const result = await Order.create(orderData)
    return result
}

// get all orders 
const getAllOrderInToDB = async () => {
    const result = await Order.find()
    return result
}

// get all orders by email 
const getOrdersByEmailInToDB = async (email: string) => {
    const result = await Order.find({ email })
    return result
}

export const OrderService = {
    createOrderIntoDB,getAllOrderInToDB,  getOrdersByEmailInToDB
}