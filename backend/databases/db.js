import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const dbconnect= ()=>{
    mongoose
    .connect(process.env.MONGO_URL, {
      // deprecated in the new version
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    })
    .then(() => console.log("Connection is successfull"))
    .catch((e) => {
      console.log("Error in connecting");
      console.error(e.message);
    });
}
export default dbconnect;