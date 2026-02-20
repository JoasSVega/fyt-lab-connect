import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
    // Exclude node_modules and dist from scanning
    "!./node_modules/**",
    "!./dist/**",
  ],
  prefix: "",
  // Aggressive purging: only keep explicitly used classes
  safelist: [
    // Keep critical utility classes that might be dynamically generated
    'hero-container',
    'hero-image',
    'hero-overlay',
    'hero-title',
    'hero-subtitle',
    'hero-content-left',
    'hero-text-shadow',
    // Color classes generated dynamically for icons
    'text-blue-600',
    'text-purple-600',
    'text-green-600',
    'text-orange-600',
    'text-slate-600',
    'text-teal-600',
    'bg-blue-50',
    'bg-purple-50',
    'bg-green-50',
    'bg-orange-50',
    'bg-slate-100',
    'bg-teal-50',
    // Button variants
    'btn-text-enhanced',
    'btn-solid-interactive',
    'cta-button',
    'cta-primary',
    'cta-secondary',
    // Form states
    'focus:ring-2',
    'focus:ring-offset-2',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // FYT Institutional Colors
        "fyt-blue": "hsl(var(--fyt-blue))",
        "fyt-red": "hsl(var(--fyt-red))",
        "fyt-purple": "hsl(var(--fyt-purple))",
        "fyt-dark": "hsl(var(--fyt-dark))",
        "fyt-light": "hsl(var(--fyt-light))",
        
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          border: "hsl(var(--card-border))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundImage: {
        "gradient-hero": "var(--gradient-hero)",
        "gradient-card": "var(--gradient-card)",
        "gradient-accent": "var(--gradient-accent)",
      },
      boxShadow: {
        "soft": "var(--shadow-soft)",
        "medium": "var(--shadow-medium)",
        "large": "var(--shadow-large)",
      },
      fontFamily: {
        poppins: ["Poppins", "Poppins Fallback", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        raleway: ["Raleway", "Raleway Fallback", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        inter: ["Inter", "Inter Fallback", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        academic: "var(--font-academic)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate, typography],
} satisfies Config;
