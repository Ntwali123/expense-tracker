import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Expense Tracker</h1>
      <div className="space-y-4">
        <Link href="/add-expense">
          <a className="text-blue-500">Add Expense</a>
        </Link>
        <Link href="/expense-list">
          <a className="text-blue-500">View Expenses</a>
        </Link>
        <Link href="/expense-summary">
          <a className="text-blue-500">View Summary</a>
        </Link>
      </div>
    </div>
  )
}
