import { useNavigate } from "react-router-dom";
import { Button } from "./common/Button";

export const AppHeader = () => {
  const navigate = useNavigate();
  function goToFeed() {
    navigate("/");
  }
  return (
    <section className="app-header secondary-bg">
      <div></div>
      <div className="logo-container" onClick={goToFeed}>
        <img
          className="logo"
          src={require("../assets/imgs/logo.svg").default}
          alt="logo-img"
        />
        <h1 className="title">Universe</h1>
      </div>
      <Button onClick={() => navigate("/login")} label={"Login"} />
    </section>
  );
};
