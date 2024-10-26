'use client';
import { useEffect, useState } from 'react';
import { getExpensesFromLocalStorage, saveExpensesToLocalStorage } from '../lib/storage';

interface Expense {
  amount: number;
  category: string;
  date: string;
  description: string;
}

export default function ExpenseList() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  useEffect(() => {
    const expensesFromStorage = getExpensesFromLocalStorage();
    setExpenses(expensesFromStorage);
  }, []);

  const deleteExpense = (index: number) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
    saveExpensesToLocalStorage(updatedExpenses);
  };

  const startEditing = (index: number) => {
    setEditingExpense(expenses[index]);
    setIsEditing(true);
  };

  const handleEdit = () => {
    if (!editingExpense) return;

    const updatedExpenses = expenses.map((expense) =>
      expense === editingExpense ? editingExpense : expense
    );

    setExpenses(updatedExpenses);
    saveExpensesToLocalStorage(updatedExpenses);
    setIsEditing(false);
    setEditingExpense(null);
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Expense List</h2>
      {expenses.length === 0 ? (
        <p>No expenses added.</p>
      ) : (
        <ul>
          {expenses.map((expense, index) => (
            <li key={index} className="mb-2 flex justify-between items-center">
              <div>
                <p>${expense.amount} - {expense.category} - {expense.date} - {expense.description}</p>
              </div>
              <div>
                <button onClick={() => startEditing(index)} className="bg-yellow-500 text-white p-1 rounded mr-2">Edit</button>
                <button onClick={() => deleteExpense(index)} className="bg-red-500 text-white p-1 rounded">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {isEditing && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Edit Expense</h3>
          <input
            type="number"
            value={editingExpense?.amount}
            onChange={(e) => setEditingExpense({ ...editingExpense!, amount: Number(e.target.value) })}
            className="border rounded p-2 mb-2 w-full"
          />
          <input
            type="text"
            value={editingExpense?.category}
            onChange={(e) => setEditingExpense({ ...editingExpense!, category: e.target.value })}
            className="border rounded p-2 mb-2 w-full"
          />
          <input
            type="date"
            value={editingExpense?.date}
            onChange={(e) => setEditingExpense({ ...editingExpense!, date: e.target.value })}
            className="border rounded p-2 mb-2 w-full"
          />
          <textarea
            value={editingExpense?.description}
            onChange={(e) => setEditingExpense({ ...editingExpense!, description: e.target.value })}
            className="border rounded p-2 mb-2 w-full"
          />
          <button onClick={handleEdit} className="bg-blue-500 text-white p-2 rounded">Save Changes</button>
        </div>
      )}
    </div>
  );
}
