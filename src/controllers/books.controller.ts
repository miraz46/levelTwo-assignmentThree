import express, { Request, Response } from "express";
import Book from "../models/book.model";
import { z } from "zod";

export const bookRoutes = express.Router();


const createBookZodSchema = z.object(
    {
        title: z.string(),
        author: z.string(),
        genre: z.string(),
        isbn: z.string(),
        description: z.string().optional(),
        copies: z.number(),
        available: z.boolean()
    }
)

// Create New Books
bookRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const body = await createBookZodSchema.parseAsync(req.body)
        const bookCreated = await Book.create(body);

        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: bookCreated
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
            error
        })
    }
})
// Get All Books
bookRoutes.get('/', async (req: Request, res: Response) => {
    const query = req.query;
    const filter = query.filter as string;
    const sortBy = query.sortBy as string || "createdAt";
    const sort = query.sort === "desc" ? -1 : 1;
    const limit = parseInt(query.limit as string) || 10;

    const queryField: any = {};
    if (filter) {
        queryField.genre = filter;
    }
    // const books = await Book.find();
    const books = await Book.find(queryField)
        .sort({ [sortBy]: sort })
        .limit(limit);
    res.status(200).json({
        success: true,
        message: "Books fetched successfully",
        data: books
    })
})
// Get Single Book
bookRoutes.get('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);

    res.status(200).json({
        success: true,
        message: "Book fetched successfully",
        data: book
    })
})
// Update Single Book
bookRoutes.patch('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const updatedBook = req.body;
    const book = await Book.findByIdAndUpdate(bookId, updatedBook, {new: true});

    res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: book
    })
})
// Delete Single Book
bookRoutes.delete('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const book = await Book.findByIdAndDelete(bookId);

    res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: null
    })
})
