import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./supabase/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#07152d",
          900: "#0c2344",
          800: "#143768"
        },
        royal: {
          700: "#1d4ed8",
          600: "#2563eb",
          100: "#dbeafe"
        },
        gold: {
          500: "#d4a72c",
          400: "#e8bc41",
          100: "#f9efc8"
        },
        mist: "#f5f8ff",
        ink: "#10203a",
        slate: "#63708a",
        line: "#d8dfef",
        success: "#157347",
        warning: "#b06b00",
        danger: "#a61b29"
      },
      boxShadow: {
        panel: "0 20px 60px rgba(9, 23, 50, 0.10)",
        card: "0 12px 28px rgba(9, 23, 50, 0.08)"
      },
      backgroundImage: {
        "mlk-hero":
          "radial-gradient(circle at top left, rgba(37, 99, 235, 0.18), transparent 26rem), radial-gradient(circle at top right, rgba(212, 167, 44, 0.22), transparent 22rem), linear-gradient(180deg, rgba(7, 21, 45, 1), rgba(12, 35, 68, 0.98))"
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "\"Times New Roman\"", "serif"],
        sans: ["\"Segoe UI\"", "Tahoma", "Geneva", "Verdana", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
