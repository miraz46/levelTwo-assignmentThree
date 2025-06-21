import { Server } from 'http';
import app from './app'
import config from "./config";
import mongoose from 'mongoose';
import cors from "cors"

// Middleware
app.use(cors());


let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url!);
    console.log('Connected to Book Server Database using Mongoose');
    server = app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(error);
  }
}

main()





  // import bookRoute from "./modules/Book/book.route";
  // import config from "./config";
  // const app = express()




  // // Middleware
  // app.use(cors());
  // app.use(express.json());
  // app.use(bookRoute);

  // app.get('/', (req, res) => {
  //   res.send({success: true, message: "BOOK server Home Page"})
  // })



  // app.listen(config.port, () => {
  //   console.log(`Example app listening on port ${config.port}`)
  // })

  // async function server(){
  //     try {
  //         await mongoose.connect(config.database_url!);
  //         console.log('Connected to Book Server Database');
  //     } catch (error) {
  //      console.log(`server error ${server}`);   
  //     }
  // }
  // server()
