import { useNavigate } from "react-router-dom";

export const AppHeader = () => {
  const navigate = useNavigate();
  function goToFeed() {
    navigate("/");
  }
  return (
    <section className="app-header secondary-bg">
      <div className="logo-container" onClick={goToFeed}>
        <img
          className="logo"
          src={require("../assets/imgs/logo.svg").default}
          alt="logo-img"
        />
        <h1 className="title">Universe</h1>
      </div>
    </section>
  );
};
