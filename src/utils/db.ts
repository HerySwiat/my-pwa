// src/utils/db.ts
import { openDB } from "idb";

const DB_NAME = "offlineDB";
const STORE_NAME = "entries";

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    },
  });
}

export async function saveEntry(data: any) {
  const db = await initDB();
  await db.add(STORE_NAME, { ...data, synced: false, date: new Date() });
}

export async function getAllEntries() {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}

export async function clearSyncedEntries() {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  const all = await store.getAll();
  all.forEach(async (item) => {
    if (item.synced) await store.delete(item.id);
  });
  await tx.done;
}
