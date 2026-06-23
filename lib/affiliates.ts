// Centralised affiliate link configuration.
// Keep all partner URLs here so they can be updated in one place.
//
// SEO policy: every affiliate link must carry rel="nofollow sponsored".
// Use AFFILIATE_REL when rendering links in components.

export const AFFILIATE_REL = "nofollow sponsored";

export const AFFILIATES = {
  fintiba: {
    url: "https://partner.fintiba.com/germanycases",
    label: "Get health insurance with Fintiba",
    description:
      "Public health insurance for international students & expats in Germany",
  },
  wise: {
    url: "https://wise.prf.hn/click/camref:1101l5KK3G",
    label: "Open a Wise account",
    description:
      "Send money abroad with low fees – ideal for expats in Germany",
  },
} as const;

export type AffiliateKey = keyof typeof AFFILIATES;
