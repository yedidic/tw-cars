import bodyParser from 'body-parser';
import cors from 'cors'; // Import the cors package
import * as dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import { Database } from './database';
import { authenticateJWT } from './middleware/auth';
import { carRoutes } from './routes/car.routes';

// Load the `.env` file
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || 'SECRET_KEY';

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
const corsOptions = {
  origin: '*', // Replace '*' with specific origins or an array of origins if needed
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Authorization,Content-Type',
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.post('/token', (req, res) => {
  const user: string = req.body.user;
  if (user === 'cars') {
    const token = jwt.sign({ user: 'cars' }, SECRET_KEY, {
      expiresIn: '7d',
    });
    res.json({ token });
  }
});

//Protected Routes
app.get('/api/ping', authenticateJWT, (req, res) => {
  res.send('Hello Protected World!');
});
app.use('/api/cars', authenticateJWT, carRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  Database.init();
});

// Example code for generating a token:
