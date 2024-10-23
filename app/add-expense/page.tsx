'use client';
import { useState } from 'react';
import { saveExpenseToLocalStorage } from '../../lib/storage';

export default function AddExpense() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!amount || !category || !date || !description) {
      setError('Please fill in all fields.');
      return;
    }

    // Reset error
    setError('');

    const expense = {
      amount: parseFloat(amount),
      category,
      date,
      description,
    };

    // Save to localStorage
    saveExpenseToLocalStorage(expense);

    // Clear form
    setAmount('');
    setCategory('');
    setDate('');
    setDescription('');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add New Expense</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="block w-full p-2 border rounded"
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="block w-full p-2 border rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="food">Food</option>
          <option value="transport">Transport</option>
          <option value="entertainment">Entertainment</option>
          <option value="others">Others</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="block w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full p-2 border rounded"
          required
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Expense
        </button>
      </form>
    </div>
  );
}
