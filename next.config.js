module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api",
        destination: "https://trade-manger.vercel.app/api",
      },
    ];
  },
  env: {
    API_AUTH_KEY: "ScCt3mkV+evE3WwtyaxB45YVRveH0uM0",
    API_AUTH_ALG: "HS256",
    API_AUTH_EXP: "12h",
  },
};
