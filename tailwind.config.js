module.exports = {
  content: [
    './src/**/*.html', // Includes all HTML files in src and its subdirectories
    './index.html',    // Specific HTML file
    './successful.html', // Another specific HTML file
  ],
  theme: {
    extend: {
      fontFamily: {
        apple: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
