let config = null;

// development configuration
const devConfig = {
  apiUrl: 'http://localhost:5001/',
};

// stage configuration
const stageConfig = {
  apiUrl: 'https://sanchoroz-facilicheck-server-stage.onrender.com/',
};

const prodConfig = {
  apiUrl: 'https://facilicheck.onrender.com/',
};

// select configuration based on environment

switch (process.env.NODE_ENV) {
  case 'production':
    config = prodConfig;
    break;
  case 'stage':
    config = stageConfig;
    break;
  default:
    config = stageConfig;
}

export default config;
