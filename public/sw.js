// public/sw.js
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js"
);

if (workbox) {
  console.log("✅ Workbox cargado correctamente");
  // ... (tu código existente de workbox)
} else {
  console.log("❌ Workbox no se pudo cargar");
}

self.addEventListener("install", (event) => {
  console.log("📦 SW instalado");
  self.skipWaiting(); // 🔥 IMPORTANTE: Forzar activación inmediata
});

self.addEventListener("activate", (event) => {
  console.log("🚀 SW activo y listo");
  event.waitUntil(self.clients.claim()); // 🔥 IMPORTANTE: Tomar control inmediato
});

// Manejo mejorado de mensajes para notificaciones locales
self.addEventListener("message", async (event) => {
  console.log("📩 Mensaje recibido en SW:", event.data);

  if (event.data && event.data.type === "FAKE_PUSH") {
    const { title, body } = event.data;

    try {
      console.log("🔄 Intentando mostrar notificación local...");

      // Verificar si tenemos permisos
      const permission = await self.registration.permission;
      console.log("🔐 Permiso del SW:", permission);

      // Mostrar notificación con más opciones
      await self.registration.showNotification(
        title || "🔔 Notificación Local",
        {
          body: body || "Esta es una notificación local de prueba",
          icon: "/icons/icon-192x192.png",
          badge: "/icons/icon-72x72.png",
          vibrate: [200, 100, 200],
          tag: "local-notification-" + Date.now(),
          requireInteraction: true, // 🔥 MANTIENE la notificación hasta que el usuario la cierre
          silent: false, // 🔥 ASEGURA que no sea silenciosa
          actions: [
            {
              action: "open",
              title: "📱 Abrir app"
            },
            {
              action: "close",
              title: "❌ Cerrar"
            }
          ]
        }
      );

      console.log("✅ Notificación local mostrada exitosamente");

    } catch (error) {
      console.error("❌ Error mostrando notificación:", error);
      console.error("🔍 Detalles del error:", error.message, error.name);

      // Intentar con una versión más simple
      try {
        await self.registration.showNotification("Notificación de prueba", {
          body: "Versión simplificada",
          icon: "/vite.svg" // Usar un ícono que seguro existe
        });
        console.log("✅ Notificación simplificada mostrada");
      } catch (simpleError) {
        console.error("❌ Falló incluso la notificación simplificada:", simpleError);
      }
    }
  }
});

// Manejo de clics en notificación (mejorado)
// En tu sw.js - agrega esto para ver si las notificaciones se están mostrando:
self.addEventListener("notificationclick", (event) => {
  console.log("🖱️ NOTIFICACIÓN CLICKEADA - esto prueba que SÍ se mostró");
  console.log("Notificación:", event.notification);
  event.notification.close();
  
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin)) {
          return client.focus();
        }
      }
      return self.clients.openWindow("/");
    })
  );
});

self.addEventListener("notificationclose", (event) => {
  console.log("❌ NOTIFICACIÓN CERRADA POR EL USUARIO");
});
