import Book from "./book.model";
const addBook = async (req, res) => {
    const body = req.body;
    const book = await Book.create(body);

    res.status(201).json({
        success: true,
        message: "Book added successfully",
        book
    });
};
export {addBook}