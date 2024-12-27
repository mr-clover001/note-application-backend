import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import connectDB from './config/db';
import userRoutes from './routes/userRoute'; 
import noteRoutes from './routes/noteRoute'; 

dotenv.config(); // Load environment variables
connectDB(); 

const app = express();

app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(helmet()); // Security middleware to set HTTP headers
app.use(cors()); // Enable CORS for all routes

// Routes
app.use('/api/users', userRoutes); 
app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT || 9000; 


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));