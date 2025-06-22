import express, { Application, Request, Response } from "express";
import Book from "./models/book.model";
import { bookRoutes } from "./controllers/books.controller";
import { borrowBookRoutes } from "./controllers/borrowBook.controller";

const app: Application = express();


app.use(express.json());
app.use("/api/books", bookRoutes);
app.use("/api/borrow",borrowBookRoutes);




app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Library Management')
})


export default app;