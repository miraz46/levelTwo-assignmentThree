import express from "express"
import cors from "cors"
import bookRoute from "./modules/Book/book.route";
import config from "./config";
import mongoose from "mongoose";
const app = express()


// Middleware
app.use(cors());
app.use(express.json());
app.use(bookRoute);

app.get('/', (req, res) => {
  res.send({success: true, message: "BOOK server Home Page"})
})



app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`)
})

async function server(){
    try {
        await mongoose.connect(config.database_url!);
        console.log('Connected to Book Server Database');
    } catch (error) {
     console.log(`server error ${server}`);   
    }
}

server()