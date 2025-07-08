/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        medium: '0 0 3px #474a51',
        'hover-button-outline':
          '0 0 0 2px hsl(var(--primary)), 0 0 0 2px hsl(var(--primary-foreground))',
        'hover-button-default':
          '0 0 0 2px hsl(var(--primary-foreground)), 0 0 0 2px hsl(var(--primary))',
        'hover-button-destructive':
          '0 0 0 2px hsl(var(--destructive-border)), 0 0 0 2px hsl(var(--primary))',
        hover:
          '0 0 0 .5px hsl(var(--primary)), 0 0 0 1px hsl(var(--primary-foreground))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        primary: ['var(--font-primary)', 'sans-serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        'background-secondary': 'hsl(var(--background-secondary))',
        'border-foreground': 'hsl(var(--border-foreground))',
        'text-color': 'hsl(var(--text-color))',
        'text-color-secondary': 'hsl(var(--text-color-secondary))',
        'card-background': 'hsl(var(--card-background))',
        'card-background-secondary': 'hsl(var(--card-background-secondary))',
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
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
