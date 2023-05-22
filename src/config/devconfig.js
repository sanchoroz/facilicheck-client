let config = null;

// development configuration
const devConfig = {
  apiUrl: `http://localhost:5002`,
};

// stage configuration
const stageConfig = {
  apiUrl: "https://sanchoroz-facilicheck-server-stage.onrender.com/",
};

const prodConfig = {
  apiUrl: "https://facilicheck.onrender.com/",
};

// select configuration based on environment
console.log("process.env.REACT_APP: ", process.env.REACT_APP);
switch (process.env.REACT_APP_ENV) {
  case "production":
    config = prodConfig;
    break;
  case "stage":
    config = stageConfig;
    break;
  case "development":
    config = devConfig;
    break;
  default:
    config = devConfig;
}

export default config;
