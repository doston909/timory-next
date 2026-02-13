const STORAGE_KEY = "timory_article_status";

export type ArticleStatusValue = "publishing" | "deleted" | "removed";

export type StoredArticleStatus = {
  status: ArticleStatusValue;
  dealerId?: string;
};

function getStorage(): Record<string, StoredArticleStatus> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, StoredArticleStatus>;
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

function setStorage(data: Record<string, StoredArticleStatus>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function getArticleStatus(articleId: number): StoredArticleStatus | undefined {
  const key = String(articleId);
  return getStorage()[key];
}

export function setArticleStatus(
  articleId: number,
  status: ArticleStatusValue,
  dealerId?: string
) {
  const storage = getStorage();
  const key = String(articleId);
  if (status === "deleted" || status === "removed") {
    storage[key] = { status, dealerId };
  } else {
    storage[key] = { status };
  }
  setStorage(storage);
}

export function isArticleDeletedForVisitor(
  articleId: number,
  currentUserId: string | undefined
): boolean {
  const stored = getArticleStatus(articleId);
  if (!stored) return false;
  if (stored.status === "removed") return true;
  if (stored.status === "deleted") return stored.dealerId !== currentUserId;
  return false;
}
