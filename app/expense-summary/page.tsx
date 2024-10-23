'use client';
import { useState, useEffect } from 'react';
import { getExpensesFromLocalStorage } from '../../lib/storage';

export default function ExpenseSummary() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Retrieve expenses from localStorage
    const expenses = getExpensesFromLocalStorage();
    // Calculate total
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotal(totalAmount);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Total Expenses</h2>
      <p className="text-xl">Total: ${total.toFixed(2)}</p>
    </div>
  );
}
