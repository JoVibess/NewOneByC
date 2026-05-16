import { en } from "@/data/en";
import { fr } from "@/data/fr";

const dictionaries = {
  fr,
  en
};

export function getDictionary(locale) {
  return dictionaries[locale];
}
