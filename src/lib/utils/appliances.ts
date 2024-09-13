export interface Appliance {
  name: string;
  avgWattage: number;
  dailyUseHours: number;
}

export const commonAppliances: Appliance[] = [
  { name: "Refrigerator", avgWattage: 150, dailyUseHours: 24 },
  { name: "Air Conditioner (1.5 ton)", avgWattage: 1500, dailyUseHours: 8 },
  { name: "LED TV (55 inch)", avgWattage: 60, dailyUseHours: 4 },
  { name: "Washing Machine", avgWattage: 500, dailyUseHours: 1 },
  { name: "Electric Kettle", avgWattage: 1500, dailyUseHours: 0.5 },
  { name: "Ceiling Fan", avgWattage: 75, dailyUseHours: 8 },
  { name: "LED Light Bulb", avgWattage: 10, dailyUseHours: 5 },
  { name: "Laptop", avgWattage: 50, dailyUseHours: 4 },
  { name: "Microwave Oven", avgWattage: 1000, dailyUseHours: 0.5 },
  { name: "Water Heater", avgWattage: 3000, dailyUseHours: 1 },
  { name: "Iron", avgWattage: 1000, dailyUseHours: 0.5 },
  { name: "Dishwasher", avgWattage: 1800, dailyUseHours: 1 },
  { name: "Desktop Computer", avgWattage: 200, dailyUseHours: 3 },
  { name: "Electric Oven", avgWattage: 2400, dailyUseHours: 0.5 },
  { name: "Hair Dryer", avgWattage: 1500, dailyUseHours: 0.2 },
];

export function calculateApplianceUsage(
  wattage: number,
  hoursPerDay: number,
  daysPerMonth: number = 30
): number {
  return (wattage * hoursPerDay * daysPerMonth) / 1000; // kWh per month
}

export function estimateMonthlyCost(kWh: number, rate: number): number {
  return Number((kWh * rate).toFixed(3));
}
