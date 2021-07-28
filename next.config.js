const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      async rewrites() {
        return [
          {
            source: "/api",
            destination: "http://localhost:3000/api",
          },
        ];
      },
      env: {
        API_AUTH_KEY: "ScCt3mkV+evE3WwtyaxB45YVRveH0uM0",
        API_AUTH_ALG: "HS256",
        API_AUTH_EXP: "12h",
      },
    };
  } else {
    return {
      reactStrictMode: true,
      async rewrites() {
        return [
          {
            source: "/api",
            destination: "https://trade-manger.herokuapp.com/api",
          },
        ];
      },
      env: {
        API_AUTH_KEY: "ScCt3mkV+evE3WwtyaxB45YVRveH0uM0",
        API_AUTH_ALG: "HS256",
        API_AUTH_EXP: "12h",
      },
    };
  }
};
