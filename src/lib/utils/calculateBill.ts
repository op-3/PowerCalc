import type { TariffType, AccountType } from "../types";
import { tariffData } from "./tariffData";

export function calculateBill(
  consumption: number,
  tariffType: TariffType,
  accountType: AccountType,
  month: number
): number {
  const tariff = tariffData[tariffType];
  let total = 0;

  if (tariffType === "nonResidential" && consumption >= 100000) {
    return consumption * tariff.largeConsumer;
  }

  for (const tier of tariff.tiers) {
    const rate =
      tier.rate[accountType]?.[month > 4 && month < 10 ? "summer" : "winter"] ??
      tier.rate.basic[month > 4 && month < 10 ? "summer" : "winter"];
    if (consumption > tier.max) {
      total += (tier.max - (tier.min || 0)) * rate;
    } else {
      total += (consumption - (tier.min || 0)) * rate;
      break;
    }
    consumption -= tier.max;
  }

  return Number(total.toFixed(3));
}
