import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "./common/Button";
import { loggedInUserState } from "../selectors/loggedInUser-selector";
import { useRecoilValue } from "recoil";
import { loggedInUser } from "../atoms/loggedInUser";
import { useRecoilState } from "recoil";
import { authService } from "../services/auth-service";
export const AppHeader = () => {
  const loggedUser = useRecoilValue(loggedInUserState);
  const [logout, setLogout] = useRecoilState(loggedInUser);

  const navigate = useNavigate();
  const location = useLocation();
  function goToFeed() {
    navigate("/");
  }
  async function logoutUser() {
    await authService.logoutUser();
    setLogout(null);
    navigate("/login");
  }
  function goToProfile() {
    navigate(`/profile/${loggedUser._id}`);
  }
  return (
    <section className="app-header secondary-bg">
      <div className="logged-user" onClick={goToProfile}>
        {loggedUser && loggedUser.userName}
      </div>
      <div className="logo-container" onClick={goToFeed}>
        <img
          className="logo"
          src={require("../assets/imgs/logo.svg").default}
          alt="logo-img"
        />
        <h1 className="title">Universe</h1>
      </div>
      {!loggedUser ? (
        location.pathname !== "/login" ? (
          <Button onClick={() => navigate("/login")} label={"Login"} />
        ) : (
          <div></div>
        )
      ) : (
        <Button onClick={logoutUser} label={"Logout"} />
      )}
    </section>
  );
};
