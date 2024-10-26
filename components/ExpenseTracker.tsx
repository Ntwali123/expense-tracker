'use client';
import { useState } from 'react';
import AddExpense from './AddExpense';
import ExpensesList from './ExpensesList';

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<any[]>(JSON.parse(localStorage.getItem('expenses') || '[]'));
  const [editingExpense, setEditingExpense] = useState(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddExpense = (newExpense: any) => {
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const handleEditExpense = (expense: any, index: number) => {
    setEditingExpense(expense);
    setEditingIndex(index);
  };

  const handleUpdateExpense = (updatedExpense: any) => {
    const updatedExpenses = expenses.map((expense, index) =>
      index === editingIndex ? updatedExpense : expense
    );
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    setEditingExpense(null);
    setEditingIndex(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>
      <AddExpense
        onAdd={handleAddExpense}
        editingExpense={editingExpense}
        onUpdate={handleUpdateExpense}
      />
      <ExpensesList onEdit={handleEditExpense} />
    </div>
  );
}
