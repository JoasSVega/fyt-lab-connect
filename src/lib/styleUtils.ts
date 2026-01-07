// Utilidades para estilos homogéneos de botones e íconos

export const buttonBase =
  "rounded-full px-5 py-2 font-semibold shadow transition focus:outline-none focus:ring-2 focus:ring-blue-200";

export const buttonVariants = {
  blue: "bg-fyt-blue text-white hover:bg-fyt-blue/90 border-fyt-blue",
  purple: "bg-fyt-purple text-white hover:bg-fyt-purple/90 border-fyt-purple",
  green: "bg-fyt-green text-white hover:bg-fyt-green/90 border-fyt-green",
  orange: "bg-fyt-orange text-white hover:bg-fyt-orange/90 border-fyt-orange",
  white: "bg-white text-fyt-blue border-fyt-blue/40 hover:bg-blue-50",
};

export const iconBase =
  "w-6 h-6 inline-flex items-center justify-center rounded-full bg-blue-50 text-blue-700";

export const iconVariants = {
  blue: "bg-blue-50 text-blue-700",
  purple: "bg-purple-50 text-purple-700",
  green: "bg-green-50 text-green-700",
  orange: "bg-orange-50 text-orange-700",
  teal: "bg-teal-50 text-teal-700",
  gray: "bg-gray-50 text-gray-700",
};
