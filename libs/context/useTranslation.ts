import { useLocale, type Locale } from "@/libs/context/LocaleContext";
import en from "../../messages/en.json";
import ko from "../../messages/ko.json";
import ru from "../../messages/ru.json";

const messages: Record<Locale, Record<string, string>> = {
  en: en as Record<string, string>,
  ko: ko as Record<string, string>,
  ru: ru as Record<string, string>,
};

export function useTranslation() {
  const { locale } = useLocale();
  const t = (key: string): string => {
    return messages[locale]?.[key] ?? messages.en?.[key] ?? key;
  };
  return { t };
}
