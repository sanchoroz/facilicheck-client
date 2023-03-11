// development configuration
const devConfig = {
  apiUrl: 'http://localhost:5000/',
};

// production configuration
const prodConfig = {
  apiUrl: 'https://facilicheck.onrender.com',
};

// select configuration based on environment
const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
