import Book from "../models/book.model";
const addBook = async (req :Request, res:Response) => {
    const body = req.body;
    const book = await Book.create(body);

    res.status(201).json({
        success: true,
        message: "Book added successfully",
        book
    });
};
export {addBook}