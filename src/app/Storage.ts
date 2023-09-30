export class Storage<T> {
  setItemToStorage(key: string, value: T) {
    const isArray = Array.isArray(value);

    localStorage.setItem(key, isArray ? JSON.stringify(value) : String(value));
  }
  getItems(key: string) {
    const data = localStorage.getItem(key);

    return data;
  }
}
