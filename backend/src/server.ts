import express from 'express';
import { connectDB } from './config/db';
import dotenv from 'dotenv';
 import authRouter from './routes/authRoutes';
/*import journalEntryRouter from './routes/journalRoutes'; */

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
/*app.use('/api/journal', journalEntryRouter); */


app.get('/', (req, res) => {
  res.send('Hello World!')
})

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
