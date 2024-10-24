'use client';
import { useState, useEffect } from 'react';
import { getExpensesFromLocalStorage } from '../../lib/storage';

interface Expense {
  amount: number;
  category: string;
  date: string;
  description: string;
}

export default function ExpenseSummary() {
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const expenses: Expense[] = getExpensesFromLocalStorage();
    
    const totalAmount = expenses.reduce((sum: number, expense: Expense) => sum + expense.amount, 0);
    
    setTotal(totalAmount);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Total Expenses</h2>
      <p className="text-xl">Total: ${total.toFixed(2)}</p>
    </div>
  );
}
