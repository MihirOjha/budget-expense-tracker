// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON requests

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is not defined in .env file');
}

// Define your models here (e.g., Budget, Expense)
const budgetSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  createdAt: { type: Date, default: Date.now },
});

const expenseSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  createdAt: { type: Date, default: Date.now },
});

const Expense = mongoose.model('Budget', expenseSchema);

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Example API endpoint to fetch budgets
app.get('/api/budgets', async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
