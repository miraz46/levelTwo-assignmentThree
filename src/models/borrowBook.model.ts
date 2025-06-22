import { model, Schema } from "mongoose";
import { IBorrowBook } from "../interfaces/borrowBook.interface";

const bookSchema = new Schema<IBorrowBook>({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book', // 🔁 Reference to Book model
        required: [true, 'Book ID is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1'],
        validate: {
            validator: Number.isInteger,
            message: 'Quantity must be an integer',
        },
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date is required'],
    },
},
    {
        timestamps: true,
        versionKey: false,
    })

const Book = model<IBorrowBook>("Book", bookSchema);
export default Book;