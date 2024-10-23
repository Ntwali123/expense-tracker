"use client";
import { useEffect, useState } from "react";
import {
  getExpensesFromLocalStorage,
  saveExpenseToLocalStorage,
  deleteExpenseFromLocalStorage,
} from "../lib/storage";

export default function ExpenseList() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingExpense, setEditingExpense] = useState<any>({
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  useEffect(() => {
    const storedExpenses = getExpensesFromLocalStorage();
    setExpenses(storedExpenses);
  }, []);

  const handleEdit = (index: number) => {
    const expense = expenses[index];
    setEditingExpense(expense);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
    deleteExpenseFromLocalStorage(index);
  };

  const handleSaveEdit = () => {
    const updatedExpenses = [...expenses];
    updatedExpenses[editingIndex!] = editingExpense;
    setExpenses(updatedExpenses);
    saveExpenseToLocalStorage(editingExpense, editingIndex);
    setEditingIndex(null);
  };

  return (
    <ul className="space-y-4">
      {expenses.map((expense, index) => (
        <li
          key={index}
          className="p-4 border rounded flex justify-between items-center"
        >
          {editingIndex === index ? (
            <div className="flex-1">
              <input
                type="number"
                value={editingExpense.amount}
                onChange={(e) =>
                  setEditingExpense({
                    ...editingExpense,
                    amount: e.target.value,
                  })
                }
                className="block w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                value={editingExpense.category}
                onChange={(e) =>
                  setEditingExpense({
                    ...editingExpense,
                    category: e.target.value,
                  })
                }
                className="block w-full p-2 border rounded mb-2"
              />
              <input
                type="date"
                value={editingExpense.date}
                onChange={(e) =>
                  setEditingExpense({ ...editingExpense, date: e.target.value })
                }
                className="block w-full p-2 border rounded mb-2"
              />
              <textarea
                value={editingExpense.description}
                onChange={(e) =>
                  setEditingExpense({
                    ...editingExpense,
                    description: e.target.value,
                  })
                }
                className="block w-full p-2 border rounded mb-2"
              ></textarea>
              <button
                onClick={handleSaveEdit}
                className="bg-green-500 text-white p-2 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setEditingIndex(null)}
                className="bg-gray-500 text-white p-2 rounded"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex-1">
              <p>
                <strong>Amount:</strong> ${expense.amount}
              </p>
              <p>
                <strong>Category:</strong> {expense.category}
              </p>
              <p>
                <strong>Date:</strong> {expense.date}
              </p>
              <p>
                <strong>Description:</strong> {expense.description}
              </p>
            </div>
          )}

          <div className="flex items-center space-x-2">
            {editingIndex !== index && (
              <>
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
