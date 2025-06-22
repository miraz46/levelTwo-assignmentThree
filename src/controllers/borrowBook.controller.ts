import express, { Request, Response } from "express";
import BorrowBook from "../models/borrowBook.model";
import { z } from "zod";

export const borrowBookRoutes = express.Router();

const createBorrowBookZodSchema = z.object(
    {
        book: z.string(),
        quantity: z.number().int().min(1, { message: "Quantity must be at least 1" }),
        dueDate: z.coerce.date()
    }
)

// Create New Borrow Book
borrowBookRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const body = await createBorrowBookZodSchema.parseAsync(req.body)
        const bookCreated = await BorrowBook.create(body);

        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: bookCreated
        })
    } catch (error: any) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
            error
        })
    }
})
// Get All Books
borrowBookRoutes.get('/', async (req, res) => {
    const books = await BorrowBook.find();
    res.status(200).json({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: books
    })
})

