import express,{Request,Response } from "express";
import Book from "../models/book.model";



export const bookRoutes = express.Router();

// Create New Books
bookRoutes.post('/', async (req, res) => {
    const body = req.body;
    const bookCreated = await Book.create(body);

    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: bookCreated
    })
})
// Get All Books
bookRoutes.get('/', async (req, res) => {
    const books = await Book.find();
    res.status(200).json({
        success: true,
        message: "Books fetched successfully",
        data: books
    })
})
// Get Single Book
bookRoutes.get('/:bookId', async (req: Request, res : Response) => {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);

    res.status(200).json({
        success: true,
        message: "Book fetched successfully",
        data: book
    })
})
// Update Single Book
bookRoutes.patch('/:bookId', async (req, res) => {
    const bookId = req.params.bookId;
    const updatedBook = req.body;
    const book = await Book.findByIdAndUpdate(bookId, updatedBook, {new: true});
    console.log(book);

    res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: book
    })
})
// Delete Single Book
bookRoutes.delete('/:bookId', async (req, res) => {
    const bookId = req.params.bookId;
    const book = await Book.findByIdAndDelete(bookId);
    console.log(book);

    res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: null
    })
})
