import express from 'express';
import authRoute from './routes/authRoute';
import protectRoute from './routes/protectRoute';

const app = express();

const PORT = 8000;
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api/auth', authRoute);      // Public auth routes
app.use('/api/protected', protectRoute); // Protected routes

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});