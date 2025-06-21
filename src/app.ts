import express, { Application, Request, Response } from "express";
import Book from "./models/book.model";

const app: Application = express();


app.use(express.json());

// Create New Books
app.post('/api/books', async (req, res) => {
    const body = req.body;
    const bookCreated = await Book.create(body);

    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: bookCreated
    })
})

// Get All Books
app.get('/api/books', async (req, res) => {
    const books = await Book.find();
    res.status(200).json({
        success: true,
        message: "Books fetched successfully",
        data: books
    })
})

// Get Single Book
app.get('/api/books/:bookId', async (req, res) => {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);

    res.status(200).json({
        success: true,
        message: "Book fetched successfully",
        data: book
    })
})

app.get('/', (req: Request, res: Response) => {
    res.send('welcome to ToDO app')
})


export default app;