import type { TariffStructure } from "../types";

export const tariffData: TariffStructure = {
  residential: {
    tiers: [
      {
        max: 4000,
        rate: {
          basic: { winter: 0.014, summer: 0.014 },
          additional: { winter: 0.022, summer: 0.022 },
        },
      },
      {
        min: 4001,
        max: 6000,
        rate: {
          basic: { winter: 0.018, summer: 0.018 },
          additional: { winter: 0.026, summer: 0.026 },
        },
      },
      {
        min: 6001,
        rate: {
          basic: { winter: 0.032, summer: 0.032 },
          additional: { winter: 0.032, summer: 0.032 },
        },
      },
    ],
  },
  nationalSupport: {
    tiers: [
      { max: 4000, rate: { basic: { winter: 0.01, summer: 0.01 } } },
      {
        min: 4001,
        max: 6000,
        rate: { basic: { winter: 0.013, summer: 0.013 } },
      },
      { min: 6001, rate: { basic: { winter: 0.02, summer: 0.02 } } },
    ],
  },
  agricultural: {
    tiers: [
      { max: 3000, rate: { basic: { winter: 0.012, summer: 0.012 } } },
      {
        min: 3001,
        max: 6000,
        rate: { basic: { winter: 0.016, summer: 0.016 } },
      },
      { min: 6001, rate: { basic: { winter: 0.024, summer: 0.024 } } },
    ],
  },
  nonResidential: {
    tiers: [{ max: 99999, rate: { basic: { winter: 0.021, summer: 0.029 } } }],
    largeConsumer: 0.035,
  },
};
