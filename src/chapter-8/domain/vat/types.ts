export const VATTypes = ["DEFAULT", "REDUCED"] as const;

export type VATType = typeof VATTypes[number];
