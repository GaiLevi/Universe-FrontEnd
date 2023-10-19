import { useRecoilState, useRecoilValue } from "recoil";
import { userService } from "../services/user-service";
import { loggedInUserState } from "../selectors/loggedInUser-selector";
import { loggedInUser } from "../atoms/loggedInUser";
import { useNavigate } from "react-router-dom";

export const UserDisplay = ({ user, onUserClick, renderFollow }) => {
  const loggedUser = useRecoilValue(loggedInUserState);
  const [currentUser, setCurrentUser] = useRecoilState(loggedInUser);
  const navigate = useNavigate();
  function goToProfile() {
    if (onUserClick) {
      onUserClick();
    }
    navigate(`/profile/${user._id}`);
  }
  async function OnToggleFollow() {
    await userService.toggleFollow(loggedUser._id, user._id);
    const updatedLoggedUser = await userService.getUserById(loggedUser._id);
    setCurrentUser(updatedLoggedUser);
  }
  function isFollowed() {
    return loggedUser.follows.includes(user._id);
  }

  return (
    user && (
      <section className="user-display-section">
        <div className="user-info" onClick={goToProfile}>
          <img
            className="profile-image"
            src={user.profileImage}
            alt="profileImage"
          />
          <p className="user-name">{user.userName}</p>
        </div>
        {!userService.isOwnUser(loggedUser, user._id) && renderFollow && (
          <div className="follow" onClick={OnToggleFollow}>
            <img
              className="follow-image"
              src={
                require(isFollowed()
                  ? `../assets/imgs/confirm.svg`
                  : `../assets/imgs/plus.svg`).default
              }
              alt="follow"
            />
            <p>{isFollowed() ? "Unfollow" : "Follow"}</p>
          </div>
        )}
      </section>
    )
  );
};
