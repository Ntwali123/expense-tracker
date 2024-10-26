'use client';
import { useState, useEffect } from 'react';

export default function AddExpense({ onAdd, currentExpense, onUpdate }: any) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentExpense) {
      setAmount(currentExpense.amount);
      setCategory(currentExpense.category);
      setDate(currentExpense.date);
      setDescription(currentExpense.description);
    }
  }, [currentExpense]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!amount || !category || !date || !description) return;

    const newExpense = { amount: parseFloat(amount), category, date, description };
    
    if (currentExpense) {
      onUpdate(newExpense);
    } else {
      const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
      expenses.push(newExpense);
      localStorage.setItem('expenses', JSON.stringify(expenses));
      onAdd(newExpense);
    }

    setAmount('');
    setCategory('');
    setDate('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="input"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        className="input"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="input"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="input"
      />
      <button type="submit" className="btn">{currentExpense ? 'Update Expense' : 'Add Expense'}</button>
    </form>
  );
}
