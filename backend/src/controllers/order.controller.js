import { Order } from "../models/order.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createAnOrder = asyncHandler(async (req, res) => {
    const { name, email, address, phone, productIds, totalPrice } = req.body;

    if (!name || !email || !address || !phone || !productIds || !totalPrice) throw new ApiError(400, "All required order details must be provided");

    const newOrder = await Order.create({
        name,
        email,
        address,
        phone,
        productIds,
        totalPrice
    });

    return res.status(201).json(new ApiResponse(201, { order: newOrder }, "Order created successfully"));
});

const getOrderByEmail = asyncHandler(async (req, res) => {
    const { email } = req.params;

    if (!email) throw new ApiError(400, "Email is required");

    const orders = await Order.find({email}).sort({createdAt: -1});

    if (!orders) throw new ApiError(404, "Order not found");

    return res.status(200).json(new ApiResponse(200, { orders }, "Orders fetched successfully"));
});

export { createAnOrder, getOrderByEmail };