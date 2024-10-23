"use client";
import { useState } from "react";
import { saveExpenseToLocalStorage } from "../lib/storage";

interface AddExpenseFormProps {
  onAddExpense: () => void;
}

export default function AddExpenseForm({ onAddExpense }: AddExpenseFormProps) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!amount || !category || !date || !description) {
      setError("Please fill in all fields.");
      return;
    }

    // Reset error
    setError("");

    const expense = {
      amount: parseFloat(amount),
      category,
      date,
      description,
    };

    // Save to localStorage
    saveExpenseToLocalStorage(expense);

    // Notify parent about the new expense
    onAddExpense();

    // Clear form
    setAmount("");
    setCategory("");
    setDate("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
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
  );
}
