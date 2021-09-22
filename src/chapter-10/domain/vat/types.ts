export const VATTypes = ["DEFAULT", "REDUCED", "TEMPORARY_COVID_VAT"] as const;

export type VATType = typeof VATTypes[number];
