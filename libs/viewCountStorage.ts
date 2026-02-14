const STORAGE_KEY = "timory_view_count";

export function getViewCount(watchId: number): number {
  if (typeof window === "undefined") return 0;
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return data[String(watchId)] ?? 0;
  } catch {
    return 0;
  }
}

export function incrementViewCount(watchId: number): number {
  if (typeof window === "undefined") return 0;
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const current = data[String(watchId)] ?? 0;
    const next = current + 1;
    data[String(watchId)] = next;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return next;
  } catch {
    return 0;
  }
}
