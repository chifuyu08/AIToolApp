import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js'
import genRoutes from './routes/genRoutes.js'
import ideaRoute from './routes/ideaRoute.js'
dotenv.config();

//middleware
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/api/v1/post',postRoutes);
app.use('/api/v1/gen',genRoutes);
app.use('/api/v1/idea',ideaRoute);


app.get('/', async (req, res) => {
    res.send("Hello from ALLIN1AI")
  });
  
  const startServer = async () => {
    try {
      connectDB(process.env.MONGODB_URL);
      app.listen(8080, () => console.log('Server started on port 8080'));
    } catch (error) {
      console.log(error);
    }
  };
  
  startServer();