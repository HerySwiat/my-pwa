// src/utils/fakeDatabaseServer.ts

// 🧩 Base de datos simulada (como si fuera MySQL o MariaDB)
let fakeDB: any[] = [];

export function saveToFakeDB(data: any) {
  fakeDB.push({ ...data, synced: true });
  console.log("💾 Guardado en FAKE MySQL:", fakeDB);
}

export function getFakeDB() {
  return fakeDB;
}
