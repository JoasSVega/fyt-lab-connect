// Fórmulas antropométricas centralizadas

export type Sex = "male" | "female";

// Masa Magra Corporal (James, Hume) - entradas: peso(kg), talla(cm)
export const mmcJames = (sex: Sex, weightKg: number, heightCm: number) => {
  const ratio = weightKg / heightCm; // ojo: especificación pide (peso/talla)^2 con talla en cm
  const base = sex === "male" ? 1.1 * weightKg - 128 * Math.pow(ratio, 2) : 1.07 * weightKg - 148 * Math.pow(ratio, 2);
  return base;
};

export const mmcHume = (sex: Sex, weightKg: number, heightCm: number) => {
  if (sex === "male") return 0.32810 * weightKg + 0.33929 * heightCm - 29.5336;
  return 0.29569 * weightKg + 0.41813 * heightCm - 43.2933;
};

// Superficie Corporal (Dubois, Gehan-George, Haycock) - entradas: peso(kg), talla(cm)
export const bsaDuBois = (weightKg: number, heightCm: number) => 0.007184 * Math.pow(weightKg, 0.425) * Math.pow(heightCm, 0.725);
export const bsaGehanGeorge = (weightKg: number, heightCm: number) => 0.0235 * Math.pow(heightCm, 0.42246) * Math.pow(weightKg, 0.51456);
export const bsaHaycock = (weightKg: number, heightCm: number) => 0.024265 * Math.pow(weightKg, 0.5378) * Math.pow(heightCm, 0.3964);

// IMC - entradas: peso(kg), talla(cm)
export const bmi = (weightKg: number, heightCm: number) => {
  const hM = heightCm / 100;
  return weightKg / (hM * hM);
};

export const bmiInterpretation = (value: number) => {
  if (value < 18.5) return "Bajo peso";
  if (value < 25) return "Normal";
  if (value < 30) return "Sobrepeso";
  return "Obesidad";
};

// Peso Ideal (Devine, Robinson, Miller) - entrada: talla(cm) convertida a pulgadas
const cmToIn = (cm: number) => cm / 2.54;
export const idealDevine = (sex: Sex, heightCm: number) => {
  const hIn = cmToIn(heightCm);
  return sex === "male" ? 50 + 2.3 * (hIn - 60) : 45.5 + 2.3 * (hIn - 60);
};
export const idealRobinson = (sex: Sex, heightCm: number) => {
  const hIn = cmToIn(heightCm);
  return sex === "male" ? 52 + 1.9 * (hIn - 60) : 49 + 1.7 * (hIn - 60);
};
export const idealMiller = (sex: Sex, heightCm: number) => {
  const hIn = cmToIn(heightCm);
  return sex === "male" ? 56.2 + 1.41 * (hIn - 60) : 53.1 + 1.36 * (hIn - 60);
};

// Consumo Energético Basal (Harris-Benedict, Mifflin–St Jeor) - entradas: peso(kg), talla(cm), edad(años)
export const cebHarrisBenedict = (sex: Sex, weightKg: number, heightCm: number, age: number) => {
  if (sex === "male") return 66.5 + 13.75 * weightKg + 5.003 * heightCm - 6.755 * age;
  return 655.1 + 9.563 * weightKg + 1.850 * heightCm - 4.676 * age;
};
export const cebMifflin = (sex: Sex, weightKg: number, heightCm: number, age: number) => {
  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
  bmr += sex === "male" ? 5 : -161;
  return bmr;
};

// Agua Corporal Total (Watson, Chumlea) - entradas: peso(kg), talla(cm), edad(años si aplica)
export const actWatson = (sex: Sex, weightKg: number, heightCm: number, age: number) => {
  if (sex === "male") return 2.447 - 0.09156 * age + 0.1074 * heightCm + 0.3362 * weightKg;
  return -2.097 + 0.1069 * heightCm + 0.2466 * weightKg; // fórmula indicada sin edad para mujeres
};
export const actChumlea = (sex: Sex, weightKg: number, heightCm: number) => {
  if (sex === "male") return 0.3669 * heightCm + 0.1833 * weightKg - 35.270;
  return 0.3561 * heightCm + 0.1833 * weightKg - 33.947;
};
