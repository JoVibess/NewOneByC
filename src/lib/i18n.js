export const locales = ["fr", "en"];

export const defaultLocale = "fr";

export function isLocale(value) {
  return locales.includes(value);
}
