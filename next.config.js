module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api",
        destination: "http://localhost:3000/api",
      },
    ];
  },
};
