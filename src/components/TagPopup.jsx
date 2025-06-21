import React from "react";
import ReactDOM from "react-dom";
import "../styles/TagPopup.css";

function TagPopup({
  popupRef,
  style = {},
  value = "",
  onChange,
  matchingTags = [],
  onSelectTag,
  onClose,
}) {
  const popup = (
    <div
      ref={popupRef}
      className="tag-popup"
      style={{
        position: "absolute",
        width: "233px",
        maxHeight: "300px",
        backgroundColor: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        borderRadius: "8px",
        padding: "12px",
        fontFamily: "sans-serif",
        zIndex: 1000,
        overflowY: "auto",
        ...style,
      }}
    >
      <div
        className="tag-popup-title"
        style={{ fontWeight: "bold", marginBottom: "8px" }}
      >
        <span
          className="arrow"
          style={{ marginRight: "6px", cursor: "pointer" }}
          onClick={onClose}
        >
          ‹
        </span>
        ДОБАВИТЬ МЕТКУ
      </div>

      <div
        className="tag-popup-subtitle"
        style={{ fontSize: "13px", color: "#555", marginBottom: "8px" }}
      >
        Выберите метку или создайте новую
      </div>

      <div className="tag-popup-search" style={{ marginBottom: "12px" }}>
        <input
          type="text"
          placeholder="Поиск..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: "100%",
            padding: "6px 8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />
      </div>

      {matchingTags.length === 0 ? (
        <div
          className="tag-popup-empty"
          style={{ fontSize: "13px", color: "#999" }}
        >
          Нет совпадений
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {matchingTags.map((tag) => (
            <li
              key={tag.id}
              onClick={() => onSelectTag(tag)}
              style={{
                padding: "6px 8px",
                cursor: "pointer",
                borderRadius: "4px",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f0f0")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              {tag.title || tag.name || `тег #${tag.id}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return ReactDOM.createPortal(popup, document.body);
}

export default TagPopup;
