export default {
  get(key) {
    if (key) {
      return localStorage.getItem(key);
    }
    return localStorage;
  },
  set(key, val) {
    if (!key) {
      return;
    }
    localStorage.setItem(key, val);
  },
  remove(key) {
    if (!key) {
      return;
    }
    localStorage.removeItem(key);
  },
};
