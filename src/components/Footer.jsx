import TaskFilter from "./TaskFilter";

export default function Footer({
  itemsLeft,
  currentFilter,
  clearCompleted,
  changeFilter,
}) {
  return (
    <footer className="footer">
      <span className="todo-count">Активных задач: {itemsLeft}</span>
      <TaskFilter changeFilter={changeFilter} currentFilter={currentFilter} />
      <button
        type="button"
        className="clear-completed"
        onClick={clearCompleted}
      >
        Удалить выполненные
      </button>
    </footer>
  );
}
