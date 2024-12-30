import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import { authenticateJWT } from './middleware/auth';
import { carRoutes } from './routes/cars';

// Load the `.env` file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

//Protected Routes
app.use('/api/cars', authenticateJWT, carRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Example code for generating a token:
const token = jwt.sign({ user: 'testUser' }, 'mysecretkey', {
  expiresIn: '1h',
});
console.log(`Generated Token: ${token}`);
