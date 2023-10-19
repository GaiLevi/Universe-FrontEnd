import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "./common/Button";
import { loggedInUserState } from "../selectors/loggedInUser-selector";
import { useRecoilValue } from "recoil";
import { loggedInUser } from "../atoms/loggedInUser";
import { useRecoilState } from "recoil";
import { authService } from "../services/auth-service";
import { Drawer } from "./Drawer";
import { useState } from "react";
import { SearchDialog } from "./SearchDialog";
export const AppHeader = () => {
  const loggedUser = useRecoilValue(loggedInUserState);
  const [isDrawer, setIsDrawer] = useState(false);
  const [isSearchDialog, setIsSearchDialog] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  function goToFeed() {
    navigate("/");
  }

  function goToProfile() {
    navigate(`/profile/${loggedUser._id}`);
  }
  function openSearchDialog() {
    setIsSearchDialog(true);
    setIsDrawer(false);
  }
  return (
    <section className="app-header secondary-bg">
      <div className="logged-user" onClick={goToProfile}>
        {loggedUser && (
          <div className="user-display">
            <img
              className="profile-img"
              src={loggedUser.profileImage}
              alt="profile-pic"
            />
            <p className="user-name">{loggedUser.userName}</p>
          </div>
        )}
      </div>
      <div className="logo-container" onClick={goToFeed}>
        <img
          className="logo"
          src={require("../assets/imgs/logo.svg").default}
          alt="logo-img"
        />
        <h1 className="title">Universe</h1>
      </div>
      <div>
        <img
          className="notification-image"
          src={require("../assets/imgs/notification.svg").default}
          alt="notification"
          onClick={() => navigate("/notifications")}
        />
        <img
          className="drawer-image"
          src={require("../assets/imgs/menu.svg").default}
          alt="menu"
          onClick={() => setIsDrawer(true)}
        />
      </div>

      <Drawer
        isOpen={isDrawer}
        onClose={() => setIsDrawer(false)}
        openSearchDialog={openSearchDialog}
      />
      <SearchDialog
        isOpen={isSearchDialog}
        onClose={() => {
          setIsSearchDialog(false);
        }}
      />
    </section>
  );
};
