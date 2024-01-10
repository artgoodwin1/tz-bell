
export default function NewTaskForm({
  labelDescription,
  onChange,
  onSubmit,
}) {
  return (
    <header className="header">
      <h1>Чек-лист</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          className="new-todo"
          placeholder="Введите задачу"
          required
          onChange={onChange}
          value={labelDescription}
        />
        <button type="submit" className="submit-button">
          Добавить
        </button>
      </form>
    </header>
  );
}
