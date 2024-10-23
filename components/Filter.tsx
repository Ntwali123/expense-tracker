'use client';
interface FilterProps {
  filter: string;
  setFilter: (filter: string) => void;
}

export default function Filter({ filter, setFilter }: FilterProps) {
  return (
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
  );
}
