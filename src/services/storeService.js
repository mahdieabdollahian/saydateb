const storage = localStorage;

export function saveData(name, data) {
  storage.setItem(name, data);
}
export function getSavedData(name) {
  return storage.getItem(name);
}
export function cleareStorage() {
  storage.clear();
}
