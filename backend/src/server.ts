import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes';
import journalRouter from './routes/journalRoutes';
import User from './models/User';
import Journal from './models/Journal';
import { sequelize } from './config/sequelize';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/journal', journalRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const PORT = process.env.PORT || 5000;

const startServer = async () => {

  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await sequelize.sync({ force: false }).then(() => {
      console.log('Database & tables created!');
    });
  });
};

startServer();
