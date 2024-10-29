import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { body, validationResult } from 'express-validator';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

const allowedOrigins = [
  'http://localhost:5173',
  'https://budget-expense-tracker-backend.onrender.com',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  }),
);

// MongoDB Connection
if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is not defined in .env file');
  process.exit(1); // Exit the application if the URI is not defined
}

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the application on connection failure
  });

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
});

// Define Budget and Expense Schemas
const budgetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const expenseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  budgetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Budget',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

// Models
const User = mongoose.models.User || mongoose.model('User', userSchema);
const Budget = mongoose.models.Budget || mongoose.model('Budget', budgetSchema);
const Expense =
  mongoose.models.Expense || mongoose.model('Expense', expenseSchema);

// Error Handling Function
const handleError = (res, error) => {
  console.error('Server error:', error);
  res.status(500).json({ message: 'Server error: ' + error.message });
};

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Add a new budget
app.post('/api/budgets', async (req, res) => {
  const { name, amount } = req.body;

  try {
    const budget = new Budget({ name, amount });
    await budget.save();
    res.status(201).json({ message: 'Budget created successfully', budget });
  } catch (error) {
    handleError(res, error);
  }
});

// Fetch budgets
app.get('/api/budgets', async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (error) {
    handleError(res, error);
  }
});

// Update budget by ID
app.put(
  '/api/budgets/:id',
  [
    body('name').isString().notEmpty(),
    body('amount').isNumeric().not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedBudget = await Budget.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      if (!updatedBudget) {
        return res.status(404).json({ message: 'Budget not found' });
      }
      res.json(updatedBudget);
    } catch (error) {
      handleError(res, error);
    }
  },
);

// Delete budget by ID
app.delete('/api/budgets/:id', async (req, res) => {
  try {
    const deletedBudget = await Budget.findByIdAndDelete(req.params.id);
    if (!deletedBudget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    res.status(204).send();
  } catch (error) {
    handleError(res, error);
  }
});

// Add a new expense
app.post('/api/expenses', async (req, res) => {
  const { name, amount, budgetId } = req.body;

  try {
    // Check if the budget exists
    const budgetExists = await Budget.findById(budgetId);
    if (!budgetExists) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    const expense = new Expense({ name, amount, budgetId });
    await expense.save();
    res.status(201).json({ message: 'Expense created successfully', expense });
  } catch (error) {
    handleError(res, error);
  }
});

// Fetch all expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find().populate('budgetId', 'name amount');
    res.json(expenses);
  } catch (error) {
    handleError(res, error);
  }
});

// Update expense by ID
app.put(
  '/api/expenses/:id',
  [
    body('name').isString().notEmpty(),
    body('amount').isNumeric().not().isEmpty(),
    body('budgetId').isMongoId().notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedExpense = await Expense.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      if (!updatedExpense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
      res.json(updatedExpense);
    } catch (error) {
      handleError(res, error);
    }
  },
);

// Delete expense by ID
app.delete('/api/expenses/:id', async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(204).send();
  } catch (error) {
    handleError(res, error);
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
