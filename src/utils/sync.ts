// src/utils/sync.ts
import { saveEntry, getAllEntries, initDB } from "./db";
import { saveToFakeDB } from "./fakeDatabaseServer";

// 💾 Guardar datos según conexión
export async function handleSave(data: any) {
  if (navigator.onLine) {
    saveToFakeDB(data); // guarda en “MySQL”
  } else {
    await saveEntry(data); // guarda offline
    console.log("📦 Guardado offline en IndexedDB:", data);
  }
}

// 🔄 Sincronizar al volver online
export async function syncOfflineData() {
  if (!navigator.onLine) return;

  const db = await initDB();
  const entries = await getAllEntries();

  if (entries.length > 0) {
    console.log("🌐 Conexión restaurada. Sincronizando datos...");
    entries.forEach((item) => {
      saveToFakeDB(item);
    });

    const tx = db.transaction("entries", "readwrite");
    tx.store.clear();
    await tx.done;

    console.log("✅ Sincronización completada y IndexedDB limpiada.");
  }
}

// Escuchar evento online global
window.addEventListener("online", () => {
  syncOfflineData();
});
