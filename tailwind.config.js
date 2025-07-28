module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#059669', // Primary (emerald-600)
        'primary-light': '#10b981', // Primary light (emerald-500)
        'primary-dark': '#047857', // Primary dark (emerald-700)
        'background': '#ffffff', // Background (white)
        'surface': '#f9fafb', // Surface (gray-50)
        'border': '#e5e7eb', // Border (gray-200)
        'text-primary': '#111827', // Text primary (gray-900)
        'text-secondary': '#4b5563', // Text secondary (gray-600)
        'text-tertiary': '#9ca3af', // Text tertiary (gray-400)
        'success': '#16a34a', // Success (green-600)
        'warning': '#f59e0b', // Warning (amber-500)
        'error': '#dc2626', // Error (red-600)
        'info': '#2563eb', // Info (blue-600)
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}