export default function SearchFilterBar({ search, onSearch, category, onCategory, categories }) {
  return (
    <div className="m3-bar">
      <input
        type="text"
        placeholder="Search events by title..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        aria-label="Search events"
      />
      <select value={category} onChange={(e) => onCategory(e.target.value)} aria-label="Filter by category">
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}
