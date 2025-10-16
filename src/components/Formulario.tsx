import React, { useState, useEffect } from "react";
import { handleSave } from "../utils/sync";
import { getAllEntries } from "../utils/db";

export default function OfflineForm() {
  const [task, setTask] = useState("");
  const [entries, setEntries] = useState<any[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", handleStatus);
    window.addEventListener("offline", handleStatus);
    getAllEntries().then(setEntries);
    return () => {
      window.removeEventListener("online", handleStatus);
      window.removeEventListener("offline", handleStatus);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;

    const entry = { text: task, date: new Date(), synced: isOnline };
    await handleSave(entry);

    setEntries([...entries, entry]);
    setTask("");

    if (!isOnline) {
      alert("📡 Sin conexión. Se guardará localmente y se sincronizará luego.");
    }
  };

  return (
    <div style={{ padding: "1.5rem" }}>
      <h2>📝 Mis tareas (Offline + Sync)</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Escribe una tarea..."
          style={{ padding: "0.5rem", width: "70%" }}
        />
        <button type="submit">Guardar</button>
      </form>

      <p style={{ color: isOnline ? "green" : "red" }}>
        Estado: {isOnline ? "Online" : "Offline"}
      </p>

      <ul>
        {entries.map((e, i) => (
          <li key={i}>
            {e.text} {e.synced ? "✅" : "📦"}
          </li>
        ))}
      </ul>
    </div>
  );
}
