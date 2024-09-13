export type TariffType =
  | "residential"
  | "nationalSupport"
  | "agricultural"
  | "nonResidential";

export type AccountType = "basic" | "additional";

export type Season = "winter" | "summer";

export interface Rate {
  [key: string]: {
    [key in Season]: number;
  };
}

export interface Tier {
  min?: number;
  max: number;
  rate: Rate;
}

export interface Tariff {
  tiers: Tier[];
  largeConsumer?: number;
}

export interface TariffStructure {
  [key in TariffType]: Tariff;
}

export interface Appliance {
  name: string;
  avgWattage: number;
  dailyUseHours: number;
}

export interface EnergySavingTip {
  category: string;
  tips: string[];
}

// واجهة نتيجة حساب الفاتورة
export interface BillResult {
  total: number;
  breakdown: {
    tier: number;
    consumption: number;
    cost: number;
  }[];
}

export interface UserSettings {
  language: "ar" | "en";
  theme: "light" | "dark";
  currency: "OMR" | "USD";
}

export interface Statistics {
  averageConsumption: number;
  highestBill: number;
  lowestBill: number;
  savingsTips: number;
}

export interface MonthlyHistory {
  month: number;
  year: number;
  consumption: number;
  bill: number;
}

export type CalculateBillFunction = (
  consumption: number,
  tariffType: TariffType,
  accountType: AccountType,
  month: number
) => BillResult;
