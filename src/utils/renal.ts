
// Conversiones
export const mgdlToUmol = (x: number): number => x * 88.4;
export const umolToMgdl = (x: number): number => x / 88.4;

// Cockcroft-Gault (ml/min)
export function cockcroftGault(age: number, weight: number, scr: number, sex: 'male' | 'female', unit: 'mgdl' | 'umol'): number {
  const scrMgdl = unit === 'umol' ? umolToMgdl(scr) : scr;
  const factor = sex === 'female' ? 0.85 : 1;
  return ((140 - age) * weight * factor) / (72 * scrMgdl);
}

// Cockcroft-Gault ajustado por BSA (ml/min/1.73m²)
export function cockcroftGaultBSA(crcl: number, weight: number, height: number): number {
  const bsa = Math.sqrt((height * weight) / 3600);
  return (crcl * 1.73) / bsa;
}

// MDRD 4 variables (ml/min/1.73m²)
export function mdrd4(age: number, scr: number, sex: 'male' | 'female', black: boolean, unit: 'mgdl' | 'umol'): number {
  const scrMgdl = unit === 'umol' ? umolToMgdl(scr) : scr;
  let gfr = 175 * Math.pow(scrMgdl, -1.154) * Math.pow(age, -0.203);
  if (sex === 'female') gfr *= 0.742;
  if (black) gfr *= 1.212;
  return gfr;
}

// MDRD 6 variables (ml/min/1.73m²)
export function mdrd6(age: number, scr: number, bun: number, alb: number, sex: 'male' | 'female', black: boolean, unit: 'mgdl' | 'umol'): number {
  const scrMgdl = unit === 'umol' ? umolToMgdl(scr) : scr;
  let gfr = 170 * Math.pow(scrMgdl, -0.999) * Math.pow(age, -0.176) * Math.pow(bun, -0.17) * Math.pow(alb, 0.318);
  if (sex === 'female') gfr *= 0.762;
  if (black) gfr *= 1.180;
  return gfr;
}

// CKD-EPI 2009 (ml/min/1.73m², con raza)
export function ckdEpi2009(age: number, scr: number, sex: 'male' | 'female', black: boolean, unit: 'mgdl' | 'umol'): number {
  const scrMgdl = unit === 'umol' ? umolToMgdl(scr) : scr;
  const k = sex === 'female' ? 0.7 : 0.9;
  const a = sex === 'female' ? -0.329 : -0.411;
  const min = Math.min(scrMgdl / k, 1);
  const max = Math.max(scrMgdl / k, 1);
  let gfr = 141 * Math.pow(min, a) * Math.pow(max, -1.209) * Math.pow(0.993, age);
  if (sex === 'female') gfr *= 1.018;
  if (black) gfr *= 1.159;
  return gfr;
}

// CKD-EPI 2021 (ml/min/1.73m², sin raza)
export function ckdEpi2021(age: number, scr: number, sex: 'male' | 'female', unit: 'mgdl' | 'umol'): number {
  const scrMgdl = unit === 'umol' ? umolToMgdl(scr) : scr;
  const k = sex === 'female' ? 0.7 : 0.9;
  const a = sex === 'female' ? -0.241 : -0.302;
  const min = Math.min(scrMgdl / k, 1);
  const max = Math.max(scrMgdl / k, 1);
  let gfr = 142 * Math.pow(min, a) * Math.pow(max, -1.200) * Math.pow(0.9938, age);
  if (sex === 'female') gfr *= 1.012;
  return gfr;
}
