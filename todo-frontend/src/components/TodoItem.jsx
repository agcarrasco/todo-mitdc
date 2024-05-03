export function TodoItem({ id, title, isCompleted, toggleItem }) {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={isCompleted}
        onClick={(e) => toggleItem(id, e.target.checked)}
      />
      <span>{title}</span>
    </div>
  );
}
