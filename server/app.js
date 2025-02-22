import express from 'express';
import cors from 'cors';
import './config/mongo.js';
import authRoutes from './routes/authRoute.js';
import productRoutes from './routes/productRoute.js';
import cartRoutes from './routes/cartRoute.js';
import orderRoutes from './routes/orderRoute.js';
import wishlistRoutes from './routes/wishlistRoute.js';
import path from 'path';
import { fileURLToPath } from "url";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middleware
app.use(express.json()); // Handles JSON payloads
app.use(express.urlencoded({ extended: true })); // Handles form submissions

// Configure CORS: Allow specific origin, methods, and headers
app.use(cors({
  origin: ['http://localhost:5173', 'http://88.222.213.217:4001', '*'], // Allow requests from both frontend origins
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
}));



// Logging middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Serve static files for images
app.use("/images", express.static("images"));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth',productRoutes);
app.use('/api/auth',cartRoutes);
app.use('/api/auth',orderRoutes);
app.use('/api/auth',wishlistRoutes);

// Start the server
const PORT = process.env.PORT || 4001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

export default app;
