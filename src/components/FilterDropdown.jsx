import React, { useRef, useEffect, useState } from "react";
import "../styles/FilterDropdown.css";

// Карты преобразования текстов в ID
const PRIORITY_MAP = {
  низкий: 1,
  средний: 2,
  высокий: 3,
};

const TYPE_MAP = {
  task: 1,
  epic: 2,
  bug: 3,
  "user story": 4,
};

const FilterDropdown = ({
  isFilterOpen,
  setIsFilterOpen,
  filterBtnRef,
  filterDropdownPos,
  setFilterDropdownPos,
  onApplyFilters,
}) => {
  const filterDropdownRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if (isFilterOpen && filterBtnRef.current) {
      const rect = filterBtnRef.current.getBoundingClientRect();
      setFilterDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [isFilterOpen, filterBtnRef, setFilterDropdownPos]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target) &&
        !filterBtnRef.current?.contains(event.target)
      ) {
        setIsFilterOpen(false);
        setActiveFilter(null);
        setInputValue("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterBtnRef]);

  const handleApply = () => {
    if (!activeFilter || inputValue.trim() === "") return;

    let value = inputValue.trim().toLowerCase();

    if (activeFilter.key === "priority") {
      value = PRIORITY_MAP[value];
      if (!value) return alert("Введите приоритет: низкий, средний, высокий");
    }

    if (activeFilter.key === "type") {
      value = TYPE_MAP[value];
      if (!value) return alert("Введите тип: task, epic, bug, user story");
    }

    const newFilters = { ...filters, [activeFilter.key]: value };
    setFilters(newFilters);
    if (typeof onApplyFilters === "function") {
      onApplyFilters(newFilters);
    }
    setInputValue("");
    setActiveFilter(null);
  };

  const handleClearFilters = () => {
    setFilters({});
    if (typeof onApplyFilters === "function") {
      onApplyFilters({});
    }
    setActiveFilter(null);
    setInputValue("");
    setIsFilterOpen(false);
  };

  const FilterModal = ({ label, onBack }) => (
    <div className="filter-modal">
      <div className="filter-header">
        <button className="back-btn" onClick={onBack}>
          ←
        </button>
        <span className="filter-title">{label}</span>
      </div>
      <input
        className="filter-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введите значение"
        autoFocus
      />
      <button className="apply-btn" onClick={handleApply}>
        ДОБАВИТЬ
      </button>
    </div>
  );

  const filterOptions = [
    { label: "Название", key: "title" },
    { label: "Срок", key: "due_date" },
    { label: "Метка", key: "tag" },
    { label: "Тип", key: "type" },
    { label: "Приоритет", key: "priority" },
  ];

  if (!isFilterOpen) return null;

  return (
    <div
      ref={filterDropdownRef}
      className="filter-dropdown"
      style={{ top: filterDropdownPos.top + 6, left: filterDropdownPos.left }}
    >
      {activeFilter === null ? (
        <div>
          <ul className="filter-options">
            {filterOptions.map(({ label, key }) => (
              <li key={key}>
                <button
                  className="filter-option-btn"
                  onClick={() => setActiveFilter({ key, label })}
                >
                  {label.toUpperCase()}
                </button>
              </li>
            ))}
          </ul>
          {Object.keys(filters).length > 0 && (
            <div>
              <button
                className="filter-option-btn"
                onClick={handleClearFilters}
                style={{ backgroundColor: "#e4effa" }}
              >
                СБРОСИТЬ ФИЛЬТРЫ
              </button>
            </div>
          )}
        </div>
      ) : (
        <FilterModal
          label={activeFilter.label}
          onBack={() => {
            setActiveFilter(null);
            setInputValue("");
          }}
        />
      )}
    </div>
  );
};

export default FilterDropdown;
