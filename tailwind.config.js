/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'views/layouts/main.handlebars',
    'views/*.handlebars',
    'views/partials/*.handlebars',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
