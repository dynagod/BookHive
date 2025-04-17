import { Book } from "../models/book.model.js";
import { Order } from "../models/order.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const adminLogin = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) throw new ApiError(400, "All fields are required");
    
    const admin =  await User.findOne({ username });
    if (!admin) throw new ApiError(404, "Admin not found");

    const isPasswordValid = await admin.isPasswordCorrect(password);
    if(!isPasswordValid) throw new ApiError(400, "Invalid user credentials");

    const token = admin.generateJwtToken();

    return res
    .status(200)
    .json(
        new ApiResponse(
            201,
            {
                token,
                user: {
                    username: admin.username,
                    role: admin.role
                }
            },
            "Authentication successfully"
        )
    );
});

const getAdminStats = asyncHandler(async (req, res) => {
    const totalOrders = await Order.countDocuments();

    const totalSales = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalSales: { $sum: "$totalPrice" }
            }
        }
    ]);

    console.log(totalSales);

    const trendingBooksCount = await Book.aggregate([
        { $match: { trending: true } },
        { $count: "trendingBooksCount" }
    ]);

    console.log(trendingBooksCount);

    const trendingBooks = trendingBooksCount.length > 0 ? trendingBooksCount[0].trendingBooksCount : 0;

    const totalBooks = await Book.countDocuments();

    const monthlySales = await Order.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },  // Group by year and month
                totalSales: { $sum: "$totalPrice" },  // Sum totalPrice for each month
                totalOrders: { $sum: 1 }  // Count total orders for each month
            }
        },
        { $sort: { _id: 1 } }  
    ]);

    return res.status(200).json(new ApiResponse(
        200,
        {
            totalOrders,
            totalSales: totalSales[0]?.totalSales || 0,
            trendingBooks,
            totalBooks,
            monthlySales
        },
        ""
    ));
});

export { adminLogin, getAdminStats }