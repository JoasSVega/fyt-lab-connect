// src/utils/renal.ts
// Conversiones y fórmulas para función renal

/**
 * Convierte creatinina entre mg/dL y µmol/L
 */
export function mgdlToUmolL(mgdl: number): number {
  return mgdl * 88.4;
}

export function umolLToMgdl(umol: number): number {
  return umol / 88.4;
}

/**
 * Cockcroft-Gault (ml/min)
 * @param age Edad (años)
 * @param weight Peso (kg)
 * @param scr Creatinina sérica (mg/dL)
 * @param sex 'male' | 'female'
 */
export function cockcroftGault(age: number, weight: number, scr: number, sex: 'male' | 'female'): number {
  // Referencia: https://www.mdcalc.com/calc/10109/cockcroft-gault-equation
  const factor = sex === 'female' ? 0.85 : 1;
  return ((140 - age) * weight * factor) / (72 * scr);
}

/**
 * Cockcroft-Gault ajustado por BSA (ml/min/1.73m²)
 * @param cgResult Resultado de Cockcroft-Gault (ml/min)
 * @param weight Peso (kg)
 * @param height Talla (cm)
 */
export function cockcroftGaultBSA(cgResult: number, weight: number, height: number): number {
  // BSA (Mosteller): sqrt([height(cm) * weight(kg)]/3600)
  const bsa = Math.sqrt((height * weight) / 3600);
  return (cgResult * 1.73) / bsa;
}

/**
 * MDRD 4 variables IDMS (ml/min/1.73m²)
 * @param age Edad (años)
 * @param scr Creatinina sérica (mg/dL)
 * @param sex 'male' | 'female'
 * @param black Raza negra (true/false)
 */
export function mdrd4(age: number, scr: number, sex: 'male' | 'female', black: boolean): number {
  // Referencia: https://www.mdcalc.com/calc/10241/mdrd-equation-glomerular-filtration-rate-gfr
  let gfr = 175 * Math.pow(scr, -1.154) * Math.pow(age, -0.203);
  if (sex === 'female') gfr *= 0.742;
  if (black) gfr *= 1.212;
  return gfr;
}

/**
 * MDRD 6 variables (ml/min/1.73m²)
 * @param age Edad (años)
 * @param scr Creatinina sérica (mg/dL)
 * @param bun Urea (mg/dL)
 * @param alb Albúmina (g/dL)
 * @param sex 'male' | 'female'
 * @param black Raza negra (true/false)
 */
export function mdrd6(age: number, scr: number, bun: number, alb: number, sex: 'male' | 'female', black: boolean): number {
  // Referencia: https://www.mdcalc.com/calc/10241/mdrd-equation-glomerular-filtration-rate-gfr
  let gfr = 170 * Math.pow(scr, -0.999) * Math.pow(age, -0.176) * Math.pow(bun, -0.17) * Math.pow(alb, 0.318);
  if (sex === 'female') gfr *= 0.762;
  if (black) gfr *= 1.180;
  return gfr;
}

/**
 * CKD-EPI 2009 (ml/min/1.73m², con raza)
 * @param age Edad (años)
 * @param scr Creatinina sérica (mg/dL)
 * @param sex 'male' | 'female'
 * @param black Raza negra (true/false)
 */
export function ckdEpi2009(age: number, scr: number, sex: 'male' | 'female', black: boolean): number {
  // Referencia: https://www.mdcalc.com/calc/3280/ckd-epi-equations-glomerular-filtration-rate-gfr
  const k = sex === 'female' ? 0.7 : 0.9;
  const a = sex === 'female' ? -0.329 : -0.411;
  const min = Math.min(scr / k, 1);
  const max = Math.max(scr / k, 1);
  let gfr = 141 * Math.pow(min, a) * Math.pow(max, -1.209) * Math.pow(0.993, age);
  if (sex === 'female') gfr *= 1.018;
  if (black) gfr *= 1.159;
  return gfr;
}

/**
 * CKD-EPI 2021 (ml/min/1.73m², sin raza)
 * @param age Edad (años)
 * @param scr Creatinina sérica (mg/dL)
 * @param sex 'male' | 'female'
 */
export function ckdEpi2021(age: number, scr: number, sex: 'male' | 'female'): number {
  // Referencia: https://www.kidney.org/content/ckd-epi-creatinine-equation-2021
  const k = sex === 'female' ? 0.7 : 0.9;
  const a = sex === 'female' ? -0.241 : -0.302;
  const min = Math.min(scr / k, 1);
  const max = Math.max(scr / k, 1);
  let gfr = 142 * Math.pow(min, a) * Math.pow(max, -1.200) * Math.pow(0.9938, age);
  if (sex === 'female') gfr *= 1.012;
  return gfr;
}
