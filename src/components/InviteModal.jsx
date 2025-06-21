import React, { useEffect, useState } from "react";
import "../styles/InviteModal.css";
import copyIcon from "../assets/copy.png";

function InviteModal({ onClose, projectId }) {
  const [inviteLink, setInviteLink] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token || !projectId) return;

    fetch(`http://localhost:8000/projects/${projectId}/generate_invite/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const token = data.token;
        const baseUrl = window.location.origin;
        const fullLink = `${baseUrl}/invite/project/${token}`;
        setInviteLink(fullLink);
      })
      .catch((err) => {
        console.error("Ошибка при получении ссылки приглашения:", err);
        setInviteLink("Ошибка загрузки ссылки");
      });
  }, [projectId]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink).catch(() => {
      console.error("Ошибка при копировании.");
    });
  };

  return (
    <div className="invite-modal-overlay" onClick={onClose}>
      <div
        className="invite-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="invite-modal-header">
          <h2>Поделиться проектом</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <label className="invite-label">Ссылка-приглашение</label>
        <div className="invite-link-box">
          <input
            type="text"
            value={inviteLink}
            readOnly
            className="invite-link-input"
          />
          <button className="copy-button" onClick={copyToClipboard}>
            <img src={copyIcon} alt="Скопировать" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default InviteModal;
