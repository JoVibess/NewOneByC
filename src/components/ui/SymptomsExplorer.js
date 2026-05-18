"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

const highlightedKeywords = {
  fr: [
    { label: "Stress", terms: ["stress"] },
    { label: "Anxiété", terms: ["anxiété", "anxieux"] },
    { label: "Dépression", terms: ["dépression"] },
    { label: "Allergies", terms: ["allergies"] },
    { label: "Intolérances alimentaires", terms: ["intolérances alimentaires"] },
    { label: "Acné", terms: ["acné"] },
    { label: "Eczéma", terms: ["eczéma"] },
    { label: "Psoriasis", terms: ["psoriasis"] },
    { label: "Sinusite", terms: ["sinusite"] },
    { label: "Asthme", terms: ["asthme"] },
    { label: "Insomnie", terms: ["insomnie"] },
    { label: "Apnée du sommeil", terms: ["apnée du sommeil"] },
    { label: "Maux de tête", terms: ["maux de tête", "céphalées"] },
    { label: "Douleurs dorsales", terms: ["douleurs dorsales", "lombalgie", "cervicalgie"] },
    { label: "Douleurs musculaires", terms: ["douleurs musculaires"] },
    { label: "Fibromyalgie", terms: ["fibromyalgie"] },
    { label: "Troubles hormonaux", terms: ["hormonaux", "hormonales"] },
    { label: "Ménopause", terms: ["ménopause"] },
    { label: "Constipation", terms: ["constipation"] },
    { label: "Microbiote", terms: ["microbiote"] }
  ],
  en: [
    { label: "Stress", terms: ["stress"] },
    { label: "Anxiety", terms: ["anxiety"] },
    { label: "Depression", terms: ["depression"] },
    { label: "Allergies", terms: ["allergies"] },
    { label: "Food intolerances", terms: ["food intolerances"] },
    { label: "Acne", terms: ["acne"] },
    { label: "Eczema", terms: ["eczema"] },
    { label: "Psoriasis", terms: ["psoriasis"] },
    { label: "Sinusitis", terms: ["sinusitis"] },
    { label: "Asthma", terms: ["asthma"] },
    { label: "Insomnia", terms: ["insomnia"] },
    { label: "Sleep apnea", terms: ["sleep apnea"] },
    { label: "Headaches", terms: ["headaches"] },
    { label: "Back pain", terms: ["back pain"] },
    { label: "Muscle pain", terms: ["muscle pain"] },
    { label: "Fibromyalgia", terms: ["fibromyalgia"] },
    { label: "Hormonal issues", terms: ["hormonal"] },
    { label: "Menopause", terms: ["menopause"] },
    { label: "Constipation", terms: ["constipation"] },
    { label: "Microbiome", terms: ["microbiome"] }
  ]
};

const symptomIcons = [
  {
    match: ["sommeil", "sleep"],
    src: "/images/fatigue.png",
    alt: { fr: "Icône fatigue", en: "Fatigue icon" }
  },
  {
    match: ["douleur", "pain"],
    src: "/images/douleur-chronique.png",
    alt: { fr: "Icône douleur chronique", en: "Chronic pain icon" }
  },
  {
    match: ["émotion", "emotion"],
    src: "/images/troubles-emotionnels.png",
    alt: { fr: "Icône troubles émotionnels", en: "Emotional concerns icon" }
  },
  {
    match: ["hormon", "hormonal"],
    src: "/images/hormones.png",
    alt: { fr: "Icône hormones", en: "Hormones icon" }
  },
  {
    match: ["traitements médicaux", "medical treatments"],
    src: "/images/medicaments.png",
    alt: { fr: "Icône traitements médicaux", en: "Medical treatments icon" }
  },
  {
    match: ["peau", "skin"],
    src: "/images/peau.png",
    alt: { fr: "Icône peau", en: "Skin icon" }
  },
  {
    match: ["digest", "microbiome"],
    src: "/images/systme-digestif.png",
    alt: { fr: "Icône système digestif", en: "Digestive system icon" }
  },
  {
    match: ["respir"],
    src: "/images/troubles-respiratoires.png",
    alt: { fr: "Icône troubles respiratoires", en: "Respiratory concerns icon" }
  },
  {
    match: ["immun"],
    src: "/images/virus.png",
    alt: { fr: "Icône système immunitaire", en: "Immune system icon" }
  },
  {
    match: ["performances", "performance"],
    src: "/images/exercice-physique.png",
    alt: { fr: "Icône performance physique", en: "Physical performance icon" }
  }
];

function getSymptomIcon(title, locale) {
  const normalizedTitle = title.toLowerCase();

  return symptomIcons.find((icon) =>
    icon.match.some((term) => normalizedTitle.includes(term))
  ) || {
    src: "/images/virus.png",
    alt: { fr: "Icône biorésonance", en: "Bioresonance icon" }
  };
}

export default function SymptomsExplorer({ title, groups, locale = "fr" }) {
  const [query, setQuery] = useState("");
  const [activeKeywords, setActiveKeywords] = useState([]);

  const labels = {
    fr: {
      search: "Rechercher",
      jumpTo: "Mots-clés",
      noResults: "Aucun symptôme ne correspond à votre recherche."
    },
    en: {
      search: "Search",
      jumpTo: "Keywords",
      noResults: "No symptom matches your search."
    }
  };

  const content = labels[locale] || labels.fr;

  const keywords = highlightedKeywords[locale] || highlightedKeywords.fr;
  const normalizedQuery = query.trim().toLowerCase();

  const filteredGroups = useMemo(() => {
    if (!normalizedQuery && activeKeywords.length === 0) {
      return groups;
    }

    return groups.filter((group) => {
      const searchableText = [group.title, ...group.items].join(" ").toLowerCase();
      const queryMatch = normalizedQuery ? searchableText.includes(normalizedQuery) : true;
      const keywordMatch = activeKeywords.length
        ? activeKeywords.some((keyword) =>
            keyword.terms.some((term) => searchableText.includes(term.toLowerCase()))
          )
        : true;

      return queryMatch && keywordMatch;
    });
  }, [activeKeywords, groups, normalizedQuery]);

  const selectedKeywordLabels = activeKeywords.map((keyword) => keyword.label);

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const toggleKeyword = (keyword) => {
    setActiveKeywords((current) =>
      current.some((item) => item.label === keyword.label)
        ? current.filter((item) => item.label !== keyword.label)
        : [...current, keyword]
      );
  };

  return (
    <div className="symptoms-explorer">
      <aside className="symptoms-explorer__sidebar">
        {title ? (
          <div className="symptoms-explorer__heading">
            <h2>{title}</h2>
          </div>
        ) : null}

        <label className="symptoms-search">
          <input
            type="search"
            value={query}
            onChange={handleSearch}
            placeholder={content.search}
            aria-label={content.search}
          />
          <span aria-hidden="true">⌕</span>
        </label>

        <p className="symptoms-explorer__label">{content.jumpTo}</p>

        <div className="symptoms-keywords" aria-label={content.jumpTo}>
          {keywords.map((keyword) => (
            <button
              key={keyword.label}
              type="button"
              className={selectedKeywordLabels.includes(keyword.label) ? "is-active" : ""}
              aria-pressed={selectedKeywordLabels.includes(keyword.label)}
              onClick={() => toggleKeyword(keyword)}
            >
              {keyword.label}
            </button>
          ))}
        </div>
      </aside>

      <div className="symptoms-explorer__results">
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group) => {
            const icon = getSymptomIcon(group.title, locale);

            return (
              <article className="symptom-row" key={group.title}>
                <div className="symptom-row__icon">
                  <Image
                    src={icon.src}
                    width={32}
                    height={32}
                    alt={icon.alt[locale] || icon.alt.fr}
                  />
                </div>
                <div>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })
        ) : (
          <p className="symptoms-explorer__empty">{content.noResults}</p>
        )}
      </div>
    </div>
  );
}
