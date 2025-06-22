import express, { Request, Response } from "express";
import BorrowBook from "../models/borrowBook.model";
import { z } from "zod";
import Book from "../models/book.model";

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
        const body = await createBorrowBookZodSchema.parseAsync(req.body);

        await Book.borrowBook(body.book, body.quantity, body.dueDate);
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

// Get books using aggregation pipeline
borrowBookRoutes.get('/', async (req, res) => {
  try {
    const bookCollection = await BorrowBook.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" }
        }
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo"
        }
      },
      {
        $unwind: "$bookInfo"
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn"
          },
          totalQuantity: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: bookCollection
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Failed to get borrowed books",
      error
    });
  }
});
