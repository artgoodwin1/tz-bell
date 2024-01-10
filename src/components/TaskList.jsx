import Task from "./Task";

export default function TaskList(props) {
  const elements = props.todos.map((item) => {
    const {
      id,
      done,
      edited,
      labelDescription,
    } = item;



    return (
      <Task
        key={id}
        done={done}
        edited={edited}
        labelDescription={labelDescription}
        onDeleted={() => props.onDeleted(id)}
        onEdit={(newName) => props.onEdit(id, newName)}
        onToggleDone={() => props.onToggleDone(id)}
        onToggleEdited={() => props.onToggleEdited(id)}
        currentFilter={props.currentFilter}
        id={id}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}
