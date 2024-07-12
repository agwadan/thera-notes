import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || '';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI /* {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    } */);
    console.log('====================================');
    console.log("DB Connected");
    console.log('====================================');
  } catch (error) {
    console.log('====================================');
    console.log(`DB Connection failed: ${error}`);
    console.log('====================================');
    process.exit(1);
  }
}
