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
