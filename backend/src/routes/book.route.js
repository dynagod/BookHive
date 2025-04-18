import { Router } from "express";
import { deleteABook, getAllBooks, getSingleBook, postABook, updateBook } from "../controllers/book.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const bookRouter =  Router();

bookRouter.post("/create-book", verifyToken, postABook);
bookRouter.get("/", getAllBooks);
bookRouter.get("/:id", getSingleBook);
bookRouter.put("/edit/:id", verifyToken, updateBook);
bookRouter.delete("/:id", verifyToken, deleteABook);

export default bookRouter;