const STORAGE_KEY = "timory_watch_status";

export type WatchStatusValue = "on_sale" | "sold_out" | "deleted" | "removed";

export type StoredWatchStatus = {
  status: WatchStatusValue;
  dealerId?: string; // set when status is created by a dealer (delete/remove)
};

function getStorage(): Record<string, StoredWatchStatus> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, StoredWatchStatus>;
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

function setStorage(data: Record<string, StoredWatchStatus>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function getWatchStatus(watchId: number): StoredWatchStatus | undefined {
  const key = String(watchId);
  return getStorage()[key];
}

export function setWatchStatus(
  watchId: number,
  status: WatchStatusValue,
  dealerId?: string
) {
  const storage = getStorage();
  const key = String(watchId);

  if (status === "deleted" || status === "removed") {
    // Persist which dealer performed the action so we can treat visibility correctly
    storage[key] = { status, dealerId };
  } else {
    storage[key] = { status };
  }

  setStorage(storage);
}

// Returns true if this watch SHOULD be hidden from the current visitor.
export function isWatchDeletedForVisitor(
  watchId: number,
  currentUserId: string | undefined
): boolean {
  const stored = getWatchStatus(watchId);
  if (!stored) return false;

  // Hard remove: hide from everyone, including the dealer who removed it
  if (stored.status === "removed") return true;

  // Soft delete: hide from everyone except the dealer who deleted it
  if (stored.status === "deleted") {
    return stored.dealerId !== currentUserId;
  }

  // On sale / sold out: always visible
  return false;
}
