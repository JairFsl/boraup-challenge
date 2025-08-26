import * as SecureStore from "expo-secure-store";

interface Storage {
  get: (key: string) => Promise<string | null>;
  set: (key: string, value: string) => Promise<void>;
  remove: (key: string) => Promise<void>;
  removeKeys: (keys: string[]) => Promise<void>;
}

export class SecureStorage implements Storage {
  // Função executada apenas durante o desenvolvimento para debugar problemas
  log(fn: string, message?: string): void {
    __DEV__ &&
      console.log(
        "[SecureStorage]: Falhou ao executar: " +
        fn +
        " ERROR: " +
        message
      );
  }

  async get(key: string): Promise<string | null> {
    try {
      const data = await SecureStore.getItemAsync(key);
      return data;
    } catch (e: any) {
      this.log("GetFunction", e);
      return null;
    }
  }

  async set(key: string, value: any) {
    try {
      if (typeof value === "string") {
        await SecureStore.setItemAsync(key, value);
      } else if (value === undefined || value === null) {
        this.log("Attempted to set undefined or null value for key: " + key);
        return;
      } else {
        await SecureStore.setItemAsync(key, JSON.stringify(value));
      }
    } catch (e: any) {
      this.log("SetFunction", e);
    }
  }

  async remove(key: string) {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (e: any) {
      this.log("RemoveFunction", e);
    }
  }

  async removeKeys(keys: string[]) {
    for (const iterator of keys) {
      await this.remove(iterator);
    }
  }
}