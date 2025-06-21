import React, { useRef } from "react";
import "../styles/TagNameModal.css";

export default function TagNameModal({
  value,
  onChange,
  onCancel,
  tags,
  setTags,
  taskData,
  setTaskData,
  allTags,
  setAllTags,
}) {
  const inputRef = useRef(null);
  const trimmedValue = value.trim();
  const lowercasedTags = allTags
    .map((t) => t?.name?.toLowerCase?.())
    .filter(Boolean);
  const matchingTags = allTags.filter(
    (tag) =>
      tag?.name && tag.name.toLowerCase().includes(trimmedValue.toLowerCase())
  );
  const exactMatch = lowercasedTags.includes(trimmedValue.toLowerCase());

  const handleCreateTag = async () => {
    if (!trimmedValue) return;

    const token = localStorage.getItem("access");
    if (!token || !taskData?.id) return;

    try {
      const res = await fetch("http://localhost:8000/tasks/tags/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: trimmedValue, description: "" }),
      });

      if (!res.ok) throw new Error("Ошибка создания тега");

      const newTag = await res.json();
      const updated = [...tags, newTag];
      const updatedAll = [...new Set([...allTags, newTag])];

      const tagIds = updated.map((t) => t.id);

      const linkRes = await fetch(
        `http://localhost:8000/tasks/tasks/${taskData.id}/tags/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ tag_ids: tagIds }),
        }
      );

      if (!linkRes.ok) throw new Error("Ошибка привязки тега к задаче");

      setTags(updated);
      setTaskData({ ...taskData, tags: updated });
      setAllTags(updatedAll);
      onChange("");
      onCancel();
    } catch (err) {
      console.error("Ошибка при создании и привязке тега:", err);
    }
  };

  const handleAttachExistingTag = async (tagName) => {
    const token = localStorage.getItem("access");
    if (!token || !taskData?.id) return;

    try {
      const matchingTag = allTags.find((t) => t.name === tagName);
      if (!matchingTag) throw new Error("Тег не найден");

      const isAlreadyTagged = tags.some((t) => t.id === matchingTag.id);
      if (isAlreadyTagged) return;

      const updated = [...tags, matchingTag];
      const tagIds = updated.map((t) => t.id);

      const linkRes = await fetch(
        `http://localhost:8000/tasks/tasks/${taskData.id}/tags/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ tag_ids: tagIds }),
        }
      );

      if (!linkRes.ok) throw new Error("Ошибка привязки тега");

      setTags(updated);
      setTaskData({ ...taskData, tags: updated });
      onChange("");
      onCancel();
    } catch (err) {
      console.error("Ошибка при привязке существующего тега:", err);
    }
  };

  const handleRemoveSuggestedTag = (tagToRemove) => {
    const updatedAll = allTags.filter((tag) => tag.name !== tagToRemove);
    setAllTags(updatedAll);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && trimmedValue && !exactMatch) {
      handleCreateTag();
    }
  };

  return (
    <div className="tagname-overlay" onClick={onCancel}>
      <div className="tagname-content" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          spellCheck={false}
          type="text"
          className="tagname-input"
          placeholder="Введите название метки"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {trimmedValue && (
        <div
          className="tagname-autocomplete"
          style={{
            position: "absolute",
            top:
              inputRef.current?.getBoundingClientRect().bottom +
              window.scrollY +
              4 +
              "px",
            left:
              inputRef.current?.getBoundingClientRect().left +
              window.scrollX +
              "px",
            width: inputRef.current?.offsetWidth || 280,
          }}
        >
          {!exactMatch && (
            <div
              className="tagname-autocomplete-item create-option"
              onClick={handleCreateTag}
            >
              Создать метку «{trimmedValue}»
            </div>
          )}

          {matchingTags.map((tag, i) => {
            const isAlreadyTagged = tags.some((t) => t.id === tag.id);
            return (
              <div key={i} className="tagname-autocomplete-item">
                <button
                  className="tagname-suggestion-btn"
                  disabled={isAlreadyTagged}
                  onClick={() =>
                    !isAlreadyTagged && handleAttachExistingTag(tag.name)
                  }
                >
                  {tag.name} {isAlreadyTagged ? "[есть]" : ""}
                </button>
                <span
                  className="tagname-remove-btn"
                  onClick={() => handleRemoveSuggestedTag(tag.name)}
                >
                  ×
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
