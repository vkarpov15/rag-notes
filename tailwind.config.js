module.exports = {
  mode: 'jit',
  content: [
    './frontend/index.html',
    './frontend/main.js'
  ],
  corePlugins: {
    container: true
  },
  plugins: [],
  theme: {
    extend: {
      colors: {
      } 
    }
  }
};