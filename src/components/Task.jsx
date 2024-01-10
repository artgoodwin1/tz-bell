import { useEffect, useState, useRef } from "react";
import classNames from "classnames";

export default function Task({
    onToggleDone,
    labelDescription,
    onDeleted,
    done,
    currentFilter,
    id,
    edited,
    onToggleEdited,
    onEdit,
}) {
    const inputRef = useRef(null);
    const [localLabelDescription, setLabelDescription] =
        useState(labelDescription);
    const [oldLabel, setOldLabel] = useState(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [edited]);

    const onLabelDescriptionChange = (e) => {
        setLabelDescription(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onEdit(localLabelDescription);
    };

    const handleEdit = () => {
        setOldLabel(localLabelDescription);
        onToggleEdited();
    };

    const editCancer = (e) => {
        if (e.which === 27) {
            setLabelDescription(oldLabel);
            onEdit(oldLabel);
        }
    };

    const liClassName = classNames({
        editing: edited,
        completed: done,
        hidden:
            (done && currentFilter === "Active") ||
            (!done && currentFilter === "Completed"),
    });

    return (
        <li className={liClassName}>
            <div className="view">
                <input
                    className="toggle"
                    type="checkbox"
                    onClick={onToggleDone}
                    checked = {done}
                    id={id}
                />
                <label htmlFor={id}>
                    <span className="title">{labelDescription}</span>
                </label>
                <button
                    type="button"
                    className="icon icon-edit"
                    onClick={done ? null : handleEdit}
                    aria-label="Edit task"
                />
                <button
                    type="button"
                    className="icon icon-destroy"
                    onClick={onDeleted}
                    aria-label="Delete task"
                />
            </div>
            {edited && (
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        className="edit"
                        value={localLabelDescription}
                        onChange={onLabelDescriptionChange}
                        onKeyDown={editCancer}
                        ref={inputRef}
                    />
                </form>
            )}
        </li>
    );
}
