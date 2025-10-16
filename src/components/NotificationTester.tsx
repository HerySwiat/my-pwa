import { useState } from "react";
import "./NotificationTester.css"; // ✅ Importar CSS

export default function NotificationTester() {
  // 🧱 Verificar soporte antes de acceder a Notification
  const isSupported = "Notification" in window && "serviceWorker" in navigator;

  // ✅ Protección: solo usar Notification.permission si existe
  let initialPermission = "unsupported";
  try {
    if (isSupported) {
      initialPermission = Notification.permission;
    }
  } catch (err) {
    console.warn("⚠️ No se pudo acceder a Notification.permission:", err);
  }

  const [permission, setPermission] = useState(initialPermission);
  const [status, setStatus] = useState("");

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
      } else if (result === "denied") {
        alert("🚫 Permiso de notificaciones denegado");
      } else {
        alert("ℹ️ Permiso de notificaciones no seleccionado");
      }
    } catch (err) {
      console.error("❌ Error al pedir permiso:", err);
      alert("⚠️ No se pudo solicitar el permiso de notificaciones.");
    }
  };

  const sendLocalNotification = async () => {
    if (!isSupported) {
      alert("🚫 Tu navegador no soporta notificaciones.");
      return;
    }

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

  const sendSWNotification = async () => {
    if (!isSupported) {
      alert("🚫 Tu navegador no soporta Service Workers.");
      return;
    }

    if (permission !== "granted") {
      alert("⚠️ Primero concede permiso para notificaciones.");
      return;
    }

    try {
      const reg = await navigator.serviceWorker.ready;

      if (reg.active) {
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
    <div className="notification-tester">
      <h3>🔔 Prueba de Notificaciones</h3>

      {!isSupported ? (
        <p className="support-warning">
          🚫 Tu navegador no soporta Notificaciones o Service Workers.
        </p>
      ) : (
        <>
          <p className="permission-status">
            Estado del permiso: <strong>{permission}</strong>
          </p>

          <div className="notification-buttons">
            <button onClick={requestPermission}>Pedir permiso</button>
            <button
              onClick={sendLocalNotification}
              disabled={permission !== "granted"}
            >
              🔹 Enviar notificación local
            </button>
            <button
              onClick={sendSWNotification}
              disabled={permission !== "granted"}
            >
              🔸 Enviar notificación vía Service Worker
            </button>
          </div>

          {status && <p className="notification-status">{status}</p>}
        </>
      )}
    </div>
  );
}
