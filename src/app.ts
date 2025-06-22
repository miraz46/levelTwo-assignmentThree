import express, { Application, NextFunction, Request, Response } from "express";
import { bookRoutes } from "./controllers/books.controller";
import { borrowBookRoutes } from "./controllers/borrowBook.controller";

const app: Application = express();


app.use(express.json());
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowBookRoutes);




app.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send('Welcome to Library Management')
    } catch (error) {
        next(error)
    }
})

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: "ROUTE NOT FOUND" })
})

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Validation failed",
            error: error.errors || error
        });
    }
})

export default app;