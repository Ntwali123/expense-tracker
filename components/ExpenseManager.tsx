'use client';
import { useState } from 'react';
import { saveExpenseToLocalStorage } from '../lib/storage';

export default function ExpenseManager({ onExpenseAdded }: { onExpenseAdded: () => void }) {
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !category || !date || !description) {
      alert('Please fill in all fields.');
      return;
    }

    const newExpense = { amount, category, date, description };
    saveExpenseToLocalStorage(newExpense);
    onExpenseAdded(); // Notify the parent component to update the list
    clearForm();
  };

  const clearForm = () => {
    setAmount(0);
    setCategory('');
    setDate('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Add New Expense</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        required
        className="border rounded p-2 mb-4 w-full"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="border rounded p-2 mb-4 w-full"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="border rounded p-2 mb-4 w-full"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="border rounded p-2 mb-4 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Expense</button>
    </form>
  );
}
