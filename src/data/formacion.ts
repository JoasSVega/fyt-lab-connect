import type { Curso, Tutoria } from "@/types/investigacion";

type ProgramaPosgrado = {
	id: number;
	nombre: string;
	nivel: "Maestría" | "Doctorado";
	institucion: string;
	anioAprobacion: number;
	rol: string;
	linea?: string;
};

export const programasPosgrado: ProgramaPosgrado[] = [
	{
		id: 1,
		nombre: "Maestría en Farmacia Asistencial",
		nivel: "Maestría",
		institucion: "Universidad de Cartagena",
		anioAprobacion: 2019,
		rol: "Docencia, tutorías clínicas y dirección de trabajos",
		linea: "Atención farmacéutica y farmacoseguridad"
	},
	{
		id: 2,
		nombre: "Maestría en Farmacología",
		nivel: "Maestría",
		institucion: "Universidad de Cartagena",
		anioAprobacion: 2019,
		rol: "Docencia, diseño de fármacos in silico y co-dirección de tesis",
		linea: "Farmacología clínica y modelado molecular"
	},
	{
		id: 3,
		nombre: "Doctorado en Ciencias Biomédicas",
		nivel: "Doctorado",
		institucion: "Universidad de Cartagena",
		anioAprobacion: 2023,
		rol: "Cotutoría de tesis en resistencia bacteriana y blancos terapéuticos",
		linea: "Microbiología, QS y diseño racional de fármacos"
	},
	{
		id: 4,
		nombre: "Doctorado en Ciencias Farmacéuticas",
		nivel: "Doctorado",
		institucion: "Universidad de Cartagena",
		anioAprobacion: 2023,
		rol: "Tutoría principal en genética y terapias avanzadas",
		linea: "Genética farmacéutica y medicina de precisión"
	}
];

export const cursosAvanzados: Curso[] = [
	{
		id: 1,
		titulo: "Diseño de fármacos por computadora: docking y dinámica molecular",
		autores: "Antistio A. Alviz Amador",
		anio: 2024,
		tipo: "Curso avanzado",
		modalidad: "Extensión",
		institucion: "Universidad de Córdoba",
		descripcion: "Electivo doctoral enfocado en docking y dinámica molecular.",
		tags: ["Modelado molecular", "In silico"]
	},
	{
		id: 2,
		titulo: "Farmacoterapia y Atención Farmacéutica I",
		autores: "Antistio A. Alviz Amador",
		anio: 2019,
		tipo: "Curso de maestría",
		institucion: "Universidad de Cartagena",
		descripcion: "Intervenciones farmacéuticas y ajuste de terapia clínica.",
		tags: ["Farmacia asistencial", "Atención farmacéutica"]
	},
	{
		id: 3,
		titulo: "Metodología de investigación aplicada",
		autores: "Antistio A. Alviz Amador",
		anio: 2019,
		tipo: "Seminario de maestría",
		institucion: "Universidad de Cartagena",
		descripcion: "Diseño de proyectos y rigor metodológico en salud.",
		tags: ["Metodología", "Diseño de estudios"]
	},
	{
		id: 4,
		titulo: "Actualización en fisiología y farmacología",
		autores: "Luis A. Utria Acevedo",
		anio: 2019,
		tipo: "Curso internacional",
		institucion: "UNIFESP (Brasil)",
		descripcion: "Revisión avanzada de mecanismos fisiológicos y farmacológicos.",
		tags: ["Fisiología", "Farmacología"]
	},
	{
		id: 5,
		titulo: "Farmacoterapéutica: integración clínica",
		autores: "Antistio A. Alviz Amador",
		anio: 2019,
		tipo: "Curso de especialización",
		institucion: "Universidad de Cartagena",
		descripcion: "Optimización terapéutica y validación farmacoterapéutica.",
		tags: ["Terapéutica", "Validación"]
	},
	{
		id: 6,
		titulo: "Drogas psicodélicas: historia, farmacología y potencial terapéutico",
		autores: "Luis A. Utria Acevedo",
		anio: 2018,
		tipo: "Curso internacional",
		institucion: "FMUSP (Brasil)",
		descripcion: "Aplicaciones terapéuticas y evaluación de riesgos.",
		tags: ["Neurofarmacología", "Salud mental"]
	}
];

export const tutorias: Tutoria[] = [
	{
		id: 1,
		titulo: "Resistencia de quorum sensing en A. baumannii (AbaI/AbaR)",
		estudiante: "Rafael J. Pineda Alemán",
		anio: 2023,
		tipo: "Doctorado",
		programa: "Ciencias Biomédicas",
		institucion: "Universidad de Cartagena",
		estado: "En curso",
		descripcion: "Cotutoría orientada a blancos moleculares para diseño de fármacos.",
		tags: ["QS", "Resistencia", "In silico"]
	},
	{
		id: 2,
		titulo: "HFE/TRF1 y hemocromatosis: caracterización genética",
		estudiante: "Luis A. Utria Acevedo",
		anio: 2023,
		tipo: "Doctorado",
		programa: "Ciencias Farmacéuticas",
		institucion: "Universidad de Cartagena",
		estado: "En curso",
		descripcion: "Tutoría principal en medicina de precisión y genética aplicada.",
		tags: ["Genética", "Medicina de precisión"]
	},
	{
		id: 3,
		titulo: "ARA II con BBB para enfermedad de Alzheimer (in silico)",
		estudiante: "Juan David Garcés Barraza",
		anio: 2024,
		tipo: "Maestría",
		programa: "Farmacología",
		institucion: "Universidad de Cartagena",
		estado: "Finalizado",
		descripcion: "Co-dirección de estudio in silico de alternativas terapéuticas.",
		tags: ["In silico", "Neurofarmacología"]
	},
	{
		id: 4,
		titulo: "Leucoplasia a carcinoma oral: análisis bioinformático",
		estudiante: "Jaime Javier Guzmán de Ávila",
		anio: 2023,
		tipo: "Maestría",
		programa: "Ciencias Básicas Biomédicas",
		institucion: "Universidad del Norte",
		estado: "Finalizado",
		descripcion: "Cotutoría en análisis transcriptómico y progresión tumoral.",
		tags: ["Bioinformática", "Oncología"]
	},
	{
		id: 5,
		titulo: "Anestésicos locales y canal Nav1.7 (dinámica molecular)",
		estudiante: "Isabella Manzur Villalobos",
		anio: 2021,
		tipo: "Maestría",
		programa: "Farmacología",
		institucion: "Universidad de Cartagena",
		estado: "Finalizado",
		descripcion: "Tutoría principal con distinción meritoria en modelado molecular.",
		tags: ["Docking", "Dinámica molecular"]
	},
	{
		id: 6,
		titulo: "Resistencia antimicrobiana en infecciones urinarias complicadas",
		estudiante: "Luis Fernando Primera Jiménez",
		anio: 2023,
		tipo: "Pregrado",
		programa: "Química Farmacéutica",
		institucion: "Universidad de Cartagena",
		estado: "Finalizado",
		descripcion: "Tutoría principal en vigilancia de resistencia y uso racional.",
		tags: ["Resistencia", "Uso racional"]
	}
];

export type { ProgramaPosgrado };
