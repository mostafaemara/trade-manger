module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api",
        destination: "http://trade-manger.herokuapp.com/api",
      },
    ];
  },
};
