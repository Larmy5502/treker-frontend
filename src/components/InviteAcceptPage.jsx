// src/pages/InviteAcceptPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function InviteAcceptPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Принимаем приглашение...");

  useEffect(() => {
    const access = localStorage.getItem("access");
    if (!access) {
      setMessage("Вы не авторизованы. Пожалуйста, войдите в систему.");
      return;
    }

    fetch("http://localhost:8000/projects/invite/accept/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "joined") {
          setMessage("Вы успешно добавлены в проект!");
          setTimeout(
            () => navigate(`/projects/${data.project_id}/boards/0`),
            2000
          );
        } else if (data.status === "already_member") {
          setMessage("Вы уже участник этого проекта.");
          setTimeout(
            () => navigate(`/projects/${data.project_id}/boards/0`),
            2000
          );
        } else {
          setMessage(data.error || "Что-то пошло не так.");
        }
      });
  }, [token, navigate]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>{message}</h2>
    </div>
  );
}

export default InviteAcceptPage;
