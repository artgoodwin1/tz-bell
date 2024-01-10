import { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import NewTaskForm from "./components/NewTaskForm";
import createTask from "./utility/createTask";


function App() {
    const [todoData, setTodoData] = useState(JSON.parse(localStorage.getItem("todoData")) || []);
    const [currentFilter, setCurrentFilter] = useState("All");
    const [labelDescription, setLabelDescription] = useState("");

    useEffect(() => {
        const storedData = localStorage.getItem("todoData");
        if (storedData) {
            setTodoData(JSON.parse(storedData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("todoData", JSON.stringify(todoData));
    }, [todoData]);

    const onToggleEdited = (id) => {
        setTodoData((prevTodoData) =>
            prevTodoData.map((item) => {
                if (item.id === id) {
                    return { ...item, edited: !item.edited };
                }
                return item;
            })
        );
    };

    const editTask = (id, newName) => {
        setTodoData((prevTodoData) =>
            prevTodoData.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        labelDescription: newName,
                        edited: false,
                    };
                }
                return item;
            })
        );
    };

    const deleteTask = (id) => {
        setTodoData((prevTodoData) =>
            prevTodoData.filter((item) => item.id !== id)
        );
    };

    const addTask = (name) => {
        const newTask = createTask(name);
        setTodoData(( prevTodoData ) => [...prevTodoData, newTask]);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        addTask(labelDescription);
        setLabelDescription("");
    };

    const onChangeInput = (e) => {
        const target = e.target.placeholder;
        if (target === "Введите задачу") {
            setLabelDescription(e.target.value);
        }
    };

    const onToggleDone = (id) => {
        setTodoData((prevTodoData) => {
            const updatedTodoData = prevTodoData.map((item) => {
                if (item.id === id) {
                    const updatedItem = { ...item, done: !item.done };
                    saveTodoItem(updatedItem); // Сохраняем обновленное состояние в localStorage
                    return updatedItem;
                }
                return item;
            });
            return updatedTodoData;
        });
    };

    // ...

    const saveTodoItem = (item) => {
        setTodoData((prevTodoData) => {
            const updatedTodoData = prevTodoData.map((existingItem) => {
                if (existingItem.id === item.id) {
                    return item;
                }
                return existingItem;
            });
            localStorage.setItem("todoData", JSON.stringify(updatedTodoData));
            return updatedTodoData;
        });
    };

    useEffect(() => {
        const storedData = localStorage.getItem("todoData");
        if (storedData) {
            setTodoData(JSON.parse(storedData));
        }
    }, []);

    const changeFilter = (name) => {
        setCurrentFilter(name);
    };

    const clearCompleted = () => {
        setTodoData(( prevTodoData ) =>
            prevTodoData.filter((item) => !item.done)
        );
    };

    const itemsLeft = todoData.filter((item) => !item.done).length; //

    return (
        <section className="todoapp">
            <NewTaskForm
                onAdd={addTask}
                labelDescription={labelDescription}
                onChange={(e) => onChangeInput(e)}
                onSubmit={(e) => onSubmit(e)}
            />
            <section className="main">
                <TaskList
                    todos={todoData}
                    onDeleted={deleteTask}
                    onEdit={editTask}
                    onToggleDone={onToggleDone}
                    currentFilter={currentFilter}
                    onToggleEdited={onToggleEdited}
                />
                <Footer
                    itemsLeft={itemsLeft}
                    changeFilter={changeFilter}
                    currentFilter={currentFilter}
                    clearCompleted={clearCompleted}
                />
            </section>
        </section>
    );
}

export default App;
