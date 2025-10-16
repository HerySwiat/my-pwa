// src/components/NotificationTester.tsx
import { useState } from "react";

export default function NotificationTester() {
    const [permission, setPermission] = useState(Notification.permission);
    const [subscription, setSubscription] = useState<PushSubscription | null>(null);

    const checkServiceWorker = async () => {
        console.log("🔍 Verificando estado del Service Worker...");
        
        if (!navigator.serviceWorker) {
            console.error("❌ Service Worker no soportado");
            return null;
        }

        const registration = await navigator.serviceWorker.ready;
        console.log("✅ Service Worker listo:", registration);
        
        if (registration.active) {
            console.log("👷 Worker activo:", registration.active.state);
        }
        if (registration.waiting) {
            console.log("⏳ Worker esperando:", registration.waiting.state);
        }
        if (registration.installing) {
            console.log("🔧 Worker instalando:", registration.installing.state);
        }
        
        return registration;
    };

    // Helper function para errores TypeScript safe
    const getErrorMessage = (error: unknown): string => {
        if (error instanceof Error) {
            return error.message;
        } else if (typeof error === 'string') {
            return error;
        } else {
            return 'Error desconocido';
        }
    };

    // 🆕 NOTIFICACIÓN DIRECTA (sin Service Worker)
    const sendDirectNotification = () => {
        console.log("🎯 Creando notificación DIRECTA en el main...");
        
        if (permission !== "granted") {
            alert("⚠️ Primero concede permiso para notificaciones.");
            return;
        }

        try {
            // Esto funciona inmediatamente sin Service Worker
            const notification = new Notification("🔔 Notificación DIRECTA", {
                body: `Esta notificación viene del MAIN. Hora: ${new Date().toLocaleTimeString()}`,
                icon: "/vite.svg",
                badge: "/vite.svg",
                tag: "direct-notification-" + Date.now(), // Tag único
                requireInteraction: false, // No forzar interacción
            });

            console.log("✅ Notificación directa creada:", notification);

            // Manejar clic en la notificación
            notification.onclick = () => {
                console.log("🖱️ Notificación directa clickeada");
                window.focus();
                notification.close();
            };

            // Manejar cierre
            notification.onclose = () => {
                console.log("❌ Notificación directa cerrada");
            };

        } catch (error) {
            console.error("❌ Error con notificación directa:", error);
            alert(`❌ Error con notificación directa: ${getErrorMessage(error)}`);
        }
    };

    const sendLocalNotification = async () => {
        console.log("=== INICIANDO PRUEBA DE NOTIFICACIÓN LOCAL ===");
        
        if (permission !== "granted") {
            alert("⚠️ Primero concede permiso para notificaciones.");
            return;
        }

        try {
            const reg = await checkServiceWorker();
            if (!reg) {
                alert("❌ No se pudo obtener el Service Worker");
                return;
            }

            const sw = reg.active || reg.waiting || reg.installing;
            console.log("💬 SW seleccionado para mensaje:", sw);
            
            if (!sw) {
                alert("❌ No hay Service Worker activo. Recarga la página.");
                return;
            }

            if (sw.state !== "activated") {
                console.warn("⚠️ SW no está activado, estado:", sw.state);
                alert("⚠️ Service Worker no está completamente activo. Intenta recargar la página.");
                return;
            }

            console.log("📤 Enviando mensaje al SW...");
            
            const message = {
                type: "FAKE_PUSH",
                title: "🔔 Notificación Local de Hery",
                body: `Esta es una notificación LOCAL. Hora: ${new Date().toLocaleTimeString()}`,
                timestamp: Date.now()
            };

            sw.postMessage(message);
            console.log("✅ Mensaje enviado via postMessage normal");

            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage(message);
                console.log("✅ Mensaje también enviado via controller");
            }

            console.log("📨 Mensaje enviado completamente");

        } catch (error) {
            console.error("❌ Error crítico al enviar notificación:", error);
            alert(`❌ Error: ${getErrorMessage(error)}`);
        }
    };

    const requestPermission = async () => {
        console.log("🔐 Solicitando permiso...");
        
        if (!("Notification" in window)) {
            alert("❌ Tu navegador no soporta notificaciones.");
            return;
        }

        const result = await Notification.requestPermission();
        console.log("📩 Resultado del permiso:", result);
        setPermission(result);
        
        if (result === "granted") {
            alert("✅ Permiso concedido. Ahora prueba las notificaciones.");
            
            // Probar una notificación directa inmediatamente
            try {
                new Notification("✅ Permiso concedido", {
                    body: "El navegador tiene permiso para notificaciones",
                    icon: "/vite.svg",
                    tag: "permission-granted"
                });
            } catch (directError) {
                console.log("ℹ️ Notificación directa no disponible");
            }
        }
    };

    const forceServiceWorkerUpdate = async () => {
        console.log("🔄 Forzando actualización del Service Worker...");
        
        if (navigator.serviceWorker) {
            const registrations = await navigator.serviceWorker.getRegistrations();
            console.log("📋 Registros SW encontrados:", registrations.length);
            
            for (let registration of registrations) {
                await registration.update();
                console.log("✅ SW actualizado:", registration);
            }
            
            alert("✅ Service Workers actualizados. Recarga la página.");
            window.location.reload();
        }
    };

    return (
        <div style={{ padding: "1rem", textAlign: "center" }}>
            <h3>🔔 Prueba de Notificaciones Push</h3>
            <p>Estado actual: <strong>{permission}</strong></p>
            <p>Suscripción: <strong>{subscription ? "✅ Activa" : "❌ Inactiva"}</strong></p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "300px", margin: "0 auto" }}>
                <button onClick={requestPermission}>
                    {permission === "default" ? "Pedir Permiso" : "Actualizar Permiso"}
                </button>
                
                {/* 🆕 BOTÓN NUEVO - Notificación Directa */}
                <button onClick={sendDirectNotification} disabled={permission !== "granted"}>
                    Notificación Directa (Main)
                </button>
                
                <button onClick={sendLocalNotification} disabled={permission !== "granted"}>
                    Notificación via Service Worker
                </button>
                
                <button onClick={forceServiceWorkerUpdate} style={{ background: "#ff4444", color: "white" }}>
                    Forzar Actualización SW
                </button>
                
                <button onClick={() => window.location.reload()} style={{ background: "#666" }}>
                    🔄 Recargar Página
                </button>
            </div>

            <div style={{ marginTop: "2rem", padding: "1rem", background: "#f5f5f5", borderRadius: "8px" }}>
                <h4>🔧 Debug Info</h4>
                <p>Service Worker: {navigator.serviceWorker ? "✅ Soportado" : "❌ No soportado"}</p>
                <p>Notification API: {("Notification" in window) ? "✅ Soportado" : "❌ No soportado"}</p>
                <p>Estado: {permission}</p>
            </div>
        </div>
    );
}