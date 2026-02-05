import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
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
        // Wellness Dashboard Neon Colors
        neon: {
          purple: "hsl(var(--neon-purple))",
          "purple-foreground": "hsl(var(--neon-purple-foreground))",
          teal: "hsl(var(--neon-teal))",
          "teal-foreground": "hsl(var(--neon-teal-foreground))",
          blue: "hsl(var(--neon-blue))",
          "blue-foreground": "hsl(var(--neon-blue-foreground))",
          pink: "hsl(var(--neon-pink))",
          "pink-foreground": "hsl(var(--neon-pink-foreground))",
          cyan: "hsl(var(--neon-cyan))",
          "cyan-foreground": "hsl(var(--neon-cyan-foreground))",
        },
        wellness: {
          excellent: "hsl(var(--wellness-excellent))",
          good: "hsl(var(--wellness-good))",
          fair: "hsl(var(--wellness-fair))",
          "needs-attention": "hsl(var(--wellness-needs-attention))",
        },
        "sidebar-dark": "hsl(var(--sidebar-dark))",
        "sidebar-dark-foreground": "hsl(var(--sidebar-dark-foreground))",
        "sidebar-item-hover": "hsl(var(--sidebar-item-hover))",
      },
      backgroundImage: {
        "bg-gradient": "var(--bg-gradient)",
        "card-gradient": "var(--card-gradient)",
      },
      boxShadow: {
        "neon-purple": "var(--glow-purple)",
        "neon-teal": "var(--glow-teal)",
        "neon-blue": "var(--glow-blue)",
        "neon-pink": "var(--glow-pink)",
        "neon-cyan": "var(--glow-cyan)",
        neon: "var(--shadow-neon)",
        card: "var(--shadow-card)",
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
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
