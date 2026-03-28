const path = require('path');

module.exports = {
  // Ваши другие настройки...
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@widgets': path.resolve(__dirname, 'src/widgets/'),
      '@shared': path.resolve(__dirname, 'src/shared/'), // <--- Добавьте эту строку
      // Добавьте другие алиасы, если они нужны
    },
  },
  // ...
};

export {};