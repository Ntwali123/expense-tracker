import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Expense Tracker</h1>
      <div className="space-y-4">
        <Link href="/add-expense">
          <h6 className="text-blue-500">Add Expense</h6>
        </Link>
        <Link href="/expense-list">
          <h6 className="text-blue-500">View Expenses</h6>
        </Link>
        <Link href="/expense-summary">
          <h6 className="text-blue-500">View Summary</h6>
        </Link>
      </div>
    </div>
  )
}
