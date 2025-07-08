/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'pulse-right': 'pulse-right 1s ease-in-out infinite',
        'pulse-down': 'pulse-down 1s ease-in-out infinite',
        'spin-on-hover': 'spin-on-hover 3s linear infinite',
      },
      boxShadow: {
        subtle: '0 0 1px #474a51',
        medium: '0 0 3px #474a51',
        'hover-button-outline':
          '0 0 0 2px hsl(var(--primary)), 0 0 0 2px hsl(var(--primary-foreground))',
        'hover-button-default':
          '0 0 0 2px hsl(var(--primary-foreground)), 0 0 0 2px hsl(var(--primary))',
        'hover-button-destructive':
          '0 0 0 2px hsl(var(--red-primary)), 0 0 0 2px hsl(var(--primary))',
        hover:
          '0 0 0 .5px hsl(var(--primary)), 0 0 0 1px hsl(var(--primary-foreground))',
        'hover-cyan':
          '0 0 0 .5px hsl(var(--cyan-primary)), 0 0 0 1px hsl(var(--cyan-secondary))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        primary: ['var(--font-primary)', 'sans-serif'],
        secondary: ['var(--font-secondary)', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
        'accordian-background': 'hsl(var(--accordian-background))',
        'accordian-background-secondary':
          'hsl(var(--accordian-background-secondary))',
        foreground: 'hsl(var(--foreground))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        'background-secondary': 'hsl(var(--background-secondary))',
        'border-foreground': 'hsl(var(--border-foreground))',
        'text-color': 'hsl(var(--text-color))',
        'text-color-secondary': 'hsl(var(--text-color-secondary))',
        'border-accordian': 'hsl(var(--border-color-accordian))',
        'card-background': 'hsl(var(--card-background))',
        'card-background-secondary': 'hsl(var(--card-background-secondary))',
        'red-primary': 'hsl(var(--red-primary))',
        'red-secondary': 'hsl(var(--red-secondary))',
        'cyan-primary': 'hsl(var(--cyan-primary))',
        'cyan-secondary': 'hsl(var(--cyan-secondary))',
        'amber-primary': 'hsl(var(--amber-primary))',
        'amber-secondary': 'hsl(var(--amber-secondary))',
        'emerald-primary': 'hsl(var(--emerald-primary))',
        'emerald-secondary': 'hsl(var(--emerald-secondary))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
