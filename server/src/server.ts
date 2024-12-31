import bodyParser from 'body-parser';
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

app.use(bodyParser.json());

app.use('/ping', (req, res) => {
  res.send('Hello World!');
});

//Protected Routes
app.use('/api/ping', authenticateJWT, (req, res) => {
  res.send('Protected Hello World!');
});
app.use('/api/cars', authenticateJWT, carRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  Database.init();
});

// Example code for generating a token:
const token = jwt.sign({ user: 'testUser' }, SECRET_KEY, {
  expiresIn: '1h',
});
console.log(`Generated Token: ${token}`);
