import dotenv from 'dotenv';
import app from './src/app.js';
import {connectDB} from './src/dbConnect/index.js';

dotenv.config({
    path : './.env'
})


connectDB()
.then(() => {
    app.listen(process.nextTick.PORT || 4000, () => {
        console.log(`Server is Runing on PORT : ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("Connection Failed !!!", error);
})