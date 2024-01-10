
const filters = [
    { label: "Все", value: "All" },
    { label: "Активные", value: "Active" },
    { label: "Выполненные", value: "Completed" },
];

export default function TaskFilter({changeFilter, currentFilter}) {
    const handleChangeFilter = (value) => {
        changeFilter(value);
    };

    return (
        <ul className="filters">
            {filters.map((filter) => (
                <li key={filter.value}>
                    <button
                        type="button"
                        className={
                            currentFilter === filter.value
                                ? "selected"
                                : ""
                        }
                        onClick={() => handleChangeFilter(filter.value)}
                    >
                        {filter.label}
                    </button>
                </li>
            ))}
        </ul>
    );
}
