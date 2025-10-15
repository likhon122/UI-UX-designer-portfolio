// Local Storage Utilities

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  USER: 'user',
  THEME: 'theme',
};

export const storage = {
  // Token management
  getToken: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  setToken: (token: string): void => {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  },

  removeToken: (): void => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  // User management
  getUser: () => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  setUser: (user: any): void => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  removeUser: (): void => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // Theme management
  getTheme: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.THEME);
  },

  setTheme: (theme: string): void => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },

  // Clear all storage
  clearAll: (): void => {
    localStorage.clear();
  },
};
