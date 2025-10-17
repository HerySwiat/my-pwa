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
      console.log("🔄 Mostrando notificación...");

      await self.registration.showNotification(
        title || "🔔 Notificación Local",
        {
          body: body || "Esta es una notificación local de prueba",
          icon: "/icons/logo-192.png",
          badge: "/icons/logo-192.png",
          vibrate: [200, 100, 200],
          tag: "local-notification-" + Date.now(),
          requireInteraction: true,
          actions: [
            { action: "open", title: "📱 Abrir app" },
            { action: "close", title: "❌ Cerrar" },
          ],
        }
      );

      console.log("✅ Notificación mostrada correctamente");

    } catch (error) {
      console.error("❌ Error mostrando notificación:", error);
      try {
        await self.registration.showNotification("Notificación simple", {
          body: "Versión simplificada",
          icon: "/icons/logo-192.png",
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

// En tu sw.js - agrega esto:
self.addEventListener("message", (event) => {
  console.log("📩 Mensaje recibido en SW:", event.data);

  if (event.data && event.data.type === "SHOW_NOTIFICATION") {
    const { title, body } = event.data;
    
    event.waitUntil(
      self.registration.showNotification(title, {
        body: body,
        icon: "/icons/logo-192.png",
        badge: "/icons/logo-192.png",
        tag: "message-notification",
        requireInteraction: true,
        vibrate: [200, 100, 200]
      })
    );
  }
});