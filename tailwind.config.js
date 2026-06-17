var config = {
    darkMode: ['class', '[data-theme="dark"]'],
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Helvetica Neue', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
                display: ['Felipa', 'serif'],
            },
            borderRadius: {
                glass: '1.375rem',
                panel: '1.5rem',
                clay: '2.25rem',
            },
            colors: {
                brand: {
                    50: '#f5f3ff',
                    100: '#ede9fe',
                    300: '#c084fc',
                    500: '#6366f1',
                    600: '#4f46e5',
                    700: '#4338ca',
                },
                parchment: {
                    50: '#fafafa',
                    100: '#f4f4f5',
                    200: '#e4e4e7',
                    300: '#d4d4d8',
                },
                graphite: {
                    100: '#f4f4f5',
                    300: '#d4d4d8',
                    400: '#a1a1aa',
                    500: '#71717a',
                    600: '#52525b',
                    800: '#27272a',
                    950: '#09090b',
                },
                ink: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    500: '#64748b',
                    700: '#334155',
                    900: '#0f172a',
                    950: '#020617',
                },
                clay: {
                    bg: '#f3ebd9',
                    card: '#fbf9f4',
                    blue: '#a9c8d9',
                    green: '#abbfa5',
                    pink: '#ebc0b5',
                    'blue-text': '#2b3e4a',
                    'green-text': '#3e5443',
                    'pink-text': '#5e3831',
                },
                carbon: {
                    bg: '#08080a',
                    card: '#121215',
                    border: '#1e1e24',
                }
            },
            boxShadow: {
                glass: '0 16px 40px rgba(0, 0, 0, 0.04)',
                'glass-light': '0 10px 25px rgba(0, 0, 0, 0.02)',
            },
            keyframes: {
                floatIn: {
                    '0%': { opacity: '0', transform: 'translateY(18px) scale(0.98)' },
                    '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
                },
            },
            animation: {
                floatIn: 'floatIn 360ms cubic-bezier(0.22, 1, 0.36, 1) both',
            },
        },
    },
    plugins: [],
};
export default config;
