import express,{Request,Response } from "express";
import Book from "../models/book.model";



export const borrowBookRoutes = express.Router();

// Create New Borrow Book
borrowBookRoutes.post('/', async (req, res) => {
    const body = req.body;
    const bookCreated = await Book.create(body);

    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: bookCreated
    })
})
// Get All Books
borrowBookRoutes.get('/', async (req, res) => {
    const books = await Book.find();
    res.status(200).json({
        success: true,
        message: "Books fetched successfully",
        data: books
    })
})

