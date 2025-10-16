// src/components/NotificationTester.tsx
import { useState } from "react";

export default function NotificationTester() {
  const [permission, setPermission] = useState(Notification.permission);
  const [status, setStatus] = useState("");

  // 📜 Verifica compatibilidad
  const isSupported = "Notification" in window && "serviceWorker" in navigator;

  const requestPermission = async () => {
    if (!isSupported) {
      alert("🚫 Este navegador no soporta notificaciones o Service Workers.");
      return;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      if (result === "granted") {
        alert("✅ Permiso de notificaciones concedido");
      } else {
        alert("🚫 Permiso denegado o no seleccionado");
      }
    } catch (err) {
      console.error("❌ Error al pedir permiso:", err);
      alert("⚠️ No se pudo solicitar el permiso de notificaciones.");
    }
  };

  // 🔔 Notificación local (sin pasar por el SW)
  const sendLocalNotification = async () => {
    if (permission !== "granted") {
      alert("⚠️ Primero concede permiso para notificaciones.");
      return;
    }

    try {
      new Notification("📢 Notificación Local", {
        body: "Esta se muestra directamente desde la página.",
        icon: "/icons/logo-192.png",
      });
      setStatus("✅ Notificación local mostrada correctamente");
    } catch (err) {
      console.error("❌ Error al mostrar notificación local:", err);
      setStatus("⚠️ Error al mostrar la notificación local");
    }
  };

  // 📦 Notificación simulada vía Service Worker
  const sendSWNotification = async () => {
    if (permission !== "granted") {
      alert("⚠️ Primero concede permiso para notificaciones.");
      return;
    }

    try {
      const reg = await navigator.serviceWorker.ready;

      if (reg.active) {
        // 📨 Enviar mensaje al SW para simular push
        reg.active.postMessage({
          type: "FAKE_PUSH",
          title: "🚀 Notificación desde Service Worker",
          body: "Simulación de push sin backend.",
        });
        setStatus("📩 Enviada al Service Worker");
      } else {
        setStatus("⚠️ El Service Worker aún no está activo");
      }
    } catch (err) {
      console.error("❌ Error al enviar mensaje al SW:", err);
      setStatus("⚠️ Error al enviar notificación vía SW");
    }
  };

  return (
    <div style={{ padding: "1rem", textAlign: "center" }}>
      <h3>🔔 Prueba de Notificaciones</h3>

      {!isSupported ? (
        <p style={{ color: "red" }}>
          🚫 Tu navegador no soporta Notificaciones o Service Workers.
        </p>
      ) : (
        <>
          <p>Estado del permiso: <strong>{permission}</strong></p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <button onClick={requestPermission}>Pedir permiso</button>
            <button onClick={sendLocalNotification} disabled={permission !== "granted"}>
              🔹 Enviar notificación local
            </button>
            <button onClick={sendSWNotification} disabled={permission !== "granted"}>
              🔸 Enviar notificación vía Service Worker
            </button>
          </div>

          {status && <p style={{ marginTop: "1rem", color: "#333" }}>{status}</p>}
        </>
      )}
    </div>
  );
}
