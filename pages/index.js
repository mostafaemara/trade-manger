import WithAuth from "../components/common/WithAuth";
function HomePage() {
  return (
    <div>
      <title>Home</title>
      <h1>Home Page</h1>
    </div>
  );
}

export default WithAuth(HomePage);
