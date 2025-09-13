import FloatingContact from "@/components/FloatingContact";
import ScrollReveal from "@/components/ScrollReveal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Lista de herramientas farmacéuticas (fácil de extender)
const tools = [
	{
		title: "Calculadoras de Función Renal",
		description: "Herramienta farmacéutica para cálculos clínicos de función renal.",
		color: "bg-fyt-blue",
		href: "/herramientas/funcion-renal",
		buttonText: "Ir a Calculadoras de Función Renal",
	},
	{
		title: "Calculadoras Antropométricas",
		description: "Herramienta farmacéutica para cálculos clínicos antropométricos.",
		color: "bg-fyt-purple",
		href: "/herramientas/antropometricas",
		buttonText: "Ir a Calculadoras Antropométricas",
	},
	// Agrega aquí nuevas herramientas fácilmente
];

const Herramientas = () => {
	const navigate = useNavigate();
	return (
			<div className="w-full bg-background overflow-x-hidden flex flex-col">
			<main className="flex-1 w-full pt-24">
				<ScrollReveal>
					<section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
						<h2 className="text-3xl md:text-4xl font-bold text-fyt-dark mb-10 text-center">
							Herramientas Farmacéuticas
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
							{tools.map((tool, idx) => (
								<Card
									key={tool.title}
									className="flex flex-col items-center rounded-xl shadow-soft bg-white/80"
								>
									<CardContent className="flex flex-col items-center gap-4 p-8 w-full">
										{/* Espacio reservado para imagen/icono */}
										<div
											className={`w-16 h-16 flex items-center justify-center rounded-full mb-2 ${tool.color} bg-opacity-10`}
										>
											{/* Imagen o icono aquí en el futuro */}
										</div>
										<h3 className="text-xl font-bold text-fyt-dark mb-2 text-center">
											{tool.title}
										</h3>
										<p className="text-muted-foreground text-center text-sm mb-4">
											{tool.description}
										</p>
										<Button
											onClick={() => navigate(tool.href)}
											className={`w-full text-white hover:opacity-90 ${tool.color}`}
										>
											{tool.buttonText}
										</Button>
									</CardContent>
								</Card>
							))}
						</div>
					</section>
				</ScrollReveal>
			</main>
			<FloatingContact />
		</div>
	);
};

export default Herramientas;
