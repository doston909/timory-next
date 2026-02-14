const HOMEPAGE_SCROLL_KEY = "homepageScrollTo";

/** Homepage sectiondan boshqa sahifaga o'tishdan oldin chaqiriladi */
export function saveHomepageSectionBeforeNav(sectionId: string) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(HOMEPAGE_SCROLL_KEY, sectionId);
  }
}

/** Homepage yuklanganda, orqaga qaytish bo'lsa scroll restore uchun ishlatiladi */
export function consumeHomepageScrollRestore(): string | null {
  if (typeof window === "undefined") return null;
  const v = sessionStorage.getItem(HOMEPAGE_SCROLL_KEY);
  if (v) {
    sessionStorage.removeItem(HOMEPAGE_SCROLL_KEY);
    return v;
  }
  return null;
}
