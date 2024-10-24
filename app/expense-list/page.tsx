'use client';
import { useState, useEffect } from 'react';
import { getExpensesFromLocalStorage } from '../../lib/storage';

export default function ExpenseList() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedExpenses = getExpensesFromLocalStorage();
    setExpenses(storedExpenses);
  }, []);

  const filteredExpenses = filter
    ? expenses.filter((expense) => expense.category === filter)
    : expenses;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Expense List</h2>
      <div className="mb-4">
        <label className="mr-2">Filter by Category:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          <option value="food">Food</option>
          <option value="transport">Transport</option>
          <option value="entertainment">Entertainment</option>
          <option value="others">Others</option>
        </select>
      </div>
      <ul className="space-y-4">
        {filteredExpenses.map((expense, index) => (
          <li key={index} className="p-4 border rounded">
            <p><strong>Amount:</strong> ${expense.amount.toFixed(2)}</p>
            <p><strong>Category:</strong> {expense.category}</p>
            <p><strong>Date:</strong> {expense.date}</p>
            <p><strong>Description:</strong> {expense.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
