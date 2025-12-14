export type ExactPower = 2.5 | 4 | 5 | 6 | 8 | 9.9 | 10 | 15 | 20 | 25 | 30 | 40 | 50 | 60 | 70 | 75 | 80 | 90 | 100 | 115 | 130 | 140 | 150 | 175 | 200 | 225 | 250 | 300;

export const exactPowers: ExactPower[] = [2.5, 4, 5, 6, 8, 9.9, 10, 15, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 100, 115, 130, 140, 150, 175, 200, 225, 250, 300];

const getPowerRange = (power: ExactPower): string => {
  if (power <= 30) return '2-30';
  if (power >= 40 && power <= 60) return '40-60';
  if (power >= 70 && power <= 90) return '70-90';
  if (power >= 100 && power <= 150) return '100-150';
  if (power >= 175 && power <= 225) return '175-225';
  if (power >= 250 && power <= 300) return '250-300';
  return '';
};

const pricingTable: Record<string, Record<string, number>> = {
  'Premium+': {
    '2-30': 250,
    '40-60': 290,
    '70-90': 330,
    '100-150': 390,
    '175-225': 450,
    '250-300': 520,
  },
  'Système de Refroidissement': {
    '2-30': 180,
    '40-60': 210,
    '70-90': 240,
    '100-150': 280,
    '175-225': 320,
    '250-300': 360,
  },
};

export const getPriceForForfait = (forfaitName: string, power: ExactPower): number | null => {
  const forfaitPricing = pricingTable[forfaitName];
  if (!forfaitPricing) return null;

  const powerRange = getPowerRange(power);
  if (!powerRange) return null;

  return forfaitPricing[powerRange] || null;
};

export const getPowerLabel = (power: ExactPower): string => {
  return `${power} CV`;
};
