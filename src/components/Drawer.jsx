import { useEffect, useState } from "react";
import { Button } from "./common/Button";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { loggedInUserState } from "../selectors/loggedInUser-selector";
import { authService } from "../services/auth-service";
import { loggedInUser } from "../atoms/loggedInUser";
import { SearchDialog } from "./SearchDialog";
import { ConfirmDialog } from "./ConfirmDialog";

export const Drawer = ({ isOpen, onClose, openSearchDialog }) => {
  const [buttons, setButtons] = useState();
  const [currentUser, setCurrentUser] = useRecoilState(loggedInUser);
  const navigate = useNavigate();
  const loggedUser = useRecoilValue(loggedInUserState);
  const [isLogoutDialog, setIsLogoutDialog] = useState(false);
  function goToProfile() {
    navigate(`/profile/${currentUser._id}`);
    onClose();
  }
  function openLogoutDialog() {
    setIsLogoutDialog(true);
  }

  async function logoutUser() {
    await authService.logoutUser();
    setCurrentUser(null);
    navigate("/login");
    onClose();
  }
  useEffect(() => {
    const drawerButtons = [
      {
        label: "Profile",
        callBack: goToProfile,
      },
      {
        label: "Search",
        callBack: openSearchDialog,
      },
      {
        label: "Logout",
        callBack: openLogoutDialog,
        class: "logout",
      },
    ];
    setButtons(drawerButtons);
  }, [loggedUser]);
  return isOpen ? (
    <section className="drawer">
      <div className="drawer-inner">
        {buttons.map((btn, index) => {
          return (
            <div className={btn.class} key={index}>
              <Button label={btn.label} onClick={btn.callBack} />
            </div>
          );
        })}
      </div>
      <div className="black-screen" onClick={onClose}></div>
      <ConfirmDialog
        isOpen={isLogoutDialog}
        onOk={logoutUser}
        onCloseDialog={() => setIsLogoutDialog(false)}
        description="Are you sure you want to logout?"
      />
    </section>
  ) : (
    <span></span>
  );
};
