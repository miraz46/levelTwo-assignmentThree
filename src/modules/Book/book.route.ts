import { Router } from "express";
import { addBook } from "./user.controller";

const bookRoute = Router();

bookRoute.post('/book', addBook);

export default bookRoute;