'use client';
import { useEffect, useState } from 'react';
import { getExpensesFromLocalStorage } from '../lib/storage';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ExpenseSummary() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [categoryData, setCategoryData] = useState<any>([]);
  const [dateData, setDateData] = useState<any>([]);

  useEffect(() => {
    const expenses = getExpensesFromLocalStorage();
    setExpenses(expenses);
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotal(totalAmount);

    const categoryMap: { [key: string]: number } = {};
    const dateMap: { [key: string]: number } = {};

    expenses.forEach((expense) => {
      // Group by category
      categoryMap[expense.category] = (categoryMap[expense.category] || 0) + expense.amount;
      // Group by date
      dateMap[expense.date] = (dateMap[expense.date] || 0) + expense.amount;
    });

    setCategoryData({
      labels: Object.keys(categoryMap),
      datasets: [
        {
          label: 'Expenses by Category',
          data: Object.values(categoryMap),
          backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
        },
      ],
    });

    setDateData({
      labels: Object.keys(dateMap),
      datasets: [
        {
          label: 'Expenses by Date',
          data: Object.values(dateMap),
          backgroundColor: '#36a2eb',
        },
      ],
    });
  }, []);

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Total Expenses</h2>
      <p className="text-lg">Total: ${total.toFixed(2)}</p>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Expenses by Category</h3>
        <Pie data={categoryData} />
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Expenses by Date</h3>
        <Bar data={dateData} />
      </div>
    </div>
  );
}
