/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html", // Scan semua file HTML di root (stok.html, tracking.html)
    "./js/**/*.js", // Scan semua file JS di folder js (untuk class dynamic di logic)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
