import { Book } from "../models/book.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { destroyOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

const postABook = asyncHandler(async (req, res) => {
    const { title, description, category, trending, oldPrice, newPrice, author } = req.body;

    if (!title || !description || !category || !trending || !author || !newPrice || !req.file) throw new ApiError(400, "All the required details are necessary");

    const imageLocalPath = req.file?.path;

    const image = await uploadOnCloudinary(imageLocalPath);

    const newBook = await Book.create({
        title,
        description,
        category,
        trending,
        author,
        coverImage: image?.url,
        oldPrice,
        newPrice
    });

    return res.status(200).json(new ApiResponse(200, { book: newBook }, "Book posted successfully"));
});

const getAllBooks = asyncHandler(async (req, res) => {
    const books = await Book.find().sort({ createdAt: -1});
    return res.status(200).json(new ApiResponse(200, { books }, "All books fetched successfully"));
});

const getSingleBook = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) throw new ApiError(400, "Book id is required");

    const book =  await Book.findById(id);

    if (!book) throw new ApiError(404, "Book not found");

    return res.status(200).json(new ApiResponse(200, { book }, "Book found successfully"));
});

const getBooksBySearch = asyncHandler(async (req, res) => {
    const rawQuery = req.query.q || "";
    const query = rawQuery.trim();

    const escapeRegex = string => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const safeQuery = escapeRegex(query);

    const keyword = {
        $or: [
            { title: { $regex: safeQuery, $options: "i" } },
            { author: { $regex: safeQuery, $options: "i" } }
        ]
    };

    const books = await Book.find(keyword);

    return res.status(200).json(new ApiResponse(200, { books }, "Matched book result"));
});

const updateBook = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) throw new ApiError(400, "Book id is required");

    const updatedBook =  await Book.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedBook) throw new ApiError(404, "Book is not found");

    return res.status(200).json(new ApiResponse(200, { book: updatedBook }, "Book updated successfully"));
});

const deleteABook = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) throw new ApiError(400, "Book id is required");

    const deletedBook =  await Book.findByIdAndDelete(id);
    const imageToBeDelete = deletedBook.coverImage;

    await destroyOnCloudinary(imageToBeDelete);

    if (!deletedBook) throw new ApiError(404, "Book is not found");

    return res.status(200).json(new ApiResponse(200, { book: deletedBook }, "Book deleted successfully"));
});

export { postABook, getAllBooks, getSingleBook, getBooksBySearch, updateBook, deleteABook };