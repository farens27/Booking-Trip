import {
  ADMIN_DEALS_STORAGE_KEY,
  ADMIN_DELETED_DEALS_STORAGE_KEY,
  ADMIN_DELETED_DESTINATIONS_STORAGE_KEY,
  ADMIN_DESTINATIONS_STORAGE_KEY,
} from "./admin";
import { LOCAL_AUTH_STORAGE_KEY } from "./auth";
import { BOOKING_QUOTE_STORAGE_KEY } from "./booking";
import {
  CONFIRMED_BOOKINGS_STORAGE_KEY,
  FAVORITE_DESTINATIONS_STORAGE_KEY,
} from "./dashboard";
import { readLocalJson, removeLocalKey, writeLocalJson } from "./local-storage";
import { NEWSLETTER_SUBSCRIBERS_STORAGE_KEY } from "./newsletter";
import { DESTINATION_REVIEWS_STORAGE_KEY } from "./reviews";

export const LOCAL_DATA_BACKUP_VERSION = 1;

export interface LocalDataBackup {
  version: number;
  exportedAt: string;
  data: Record<string, unknown>;
}

const localPreviewStorageKeys = [
  LOCAL_AUTH_STORAGE_KEY,
  BOOKING_QUOTE_STORAGE_KEY,
  CONFIRMED_BOOKINGS_STORAGE_KEY,
  FAVORITE_DESTINATIONS_STORAGE_KEY,
  DESTINATION_REVIEWS_STORAGE_KEY,
  NEWSLETTER_SUBSCRIBERS_STORAGE_KEY,
  ADMIN_DESTINATIONS_STORAGE_KEY,
  ADMIN_DELETED_DESTINATIONS_STORAGE_KEY,
  ADMIN_DEALS_STORAGE_KEY,
  ADMIN_DELETED_DEALS_STORAGE_KEY,
] as const;

export function getLocalPreviewStorageKeys() {
  return [...localPreviewStorageKeys];
}

export function createLocalDataBackup(): LocalDataBackup {
  const data = getLocalPreviewStorageKeys().reduce<Record<string, unknown>>(
    (backupData, key) => {
      backupData[key] = readLocalJson<unknown>(key, null);
      return backupData;
    },
    {}
  );

  return {
    version: LOCAL_DATA_BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    data,
  };
}

export function parseLocalDataBackup(json: string): LocalDataBackup {
  let parsed: unknown;

  try {
    parsed = JSON.parse(json);
  } catch {
    throw new Error("Invalid backup JSON.");
  }

  if (!isLocalDataBackup(parsed)) {
    throw new Error("Unsupported backup format.");
  }

  return parsed;
}

export function restoreLocalDataBackup(backup: LocalDataBackup) {
  if (!isLocalDataBackup(backup)) {
    throw new Error("Unsupported backup format.");
  }

  getLocalPreviewStorageKeys().forEach((key) => {
    const value = backup.data[key];
    if (value === null || typeof value === "undefined") {
      removeLocalKey(key);
    } else {
      writeLocalJson(key, value);
    }
  });
}

export function resetAllLocalPreviewData() {
  getLocalPreviewStorageKeys().forEach((key) => removeLocalKey(key));
}

function isLocalDataBackup(value: unknown): value is LocalDataBackup {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<LocalDataBackup>;
  return (
    candidate.version === LOCAL_DATA_BACKUP_VERSION &&
    typeof candidate.exportedAt === "string" &&
    Boolean(candidate.data) &&
    typeof candidate.data === "object" &&
    !Array.isArray(candidate.data)
  );
}
