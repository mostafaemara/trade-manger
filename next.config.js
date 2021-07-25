module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api",
        destination: "https://trade-manger.herokuapp.com/api",
      },
    ];
  },
};
