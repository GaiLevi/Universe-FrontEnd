import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostsFeed } from "../components/PostsFeed";
import { postService } from "../services/post-service";
import { userService } from "../services/user-service";
import { useRecoilState, useRecoilValue } from "recoil";
import { loggedInUserState } from "../selectors/loggedInUser-selector";
import { authService } from "../services/auth-service";
import { loggedInUser } from "../atoms/loggedInUser";

export const ProfilePage = () => {
  const { id } = useParams();
  useEffect(() => {
    getUser();
    getUserPosts();
  }, [id]);
  const [user, setUser] = useState();
  const [userPosts, setUserPosts] = useState([]);
  const loggedUser = useRecoilValue(loggedInUserState);
  const [currentUser, setCurrentUser] = useRecoilState(loggedInUser);

  const navigate = useNavigate();
  async function getUser() {
    setUser(await userService.getUserById(id));
  }
  async function getUserPosts() {
    setUserPosts(await postService.getUserPosts(id));
  }
  async function deletePost(postId) {
    await postService.deletePost(postId);
    setUserPosts(await postService.getUserPosts(id));
  }
  async function enterPost(postId) {
    navigate(`/post/${postId}`);
  }
  async function OnToggleFollow() {
    await userService.toggleFollow(loggedUser._id, id);
    const updatedLoggedUser = await userService.getUserById(loggedUser._id);
    setCurrentUser(updatedLoggedUser);
  }
  function isFollowed() {
    return loggedUser.follows.includes(id);
  }

  return (
    <section className="profile-page">
      {user && (
        <div>
          <div className="user-display-header">
            <img
              className="profile-img-header"
              src={user.profileImage}
              alt="profile-img"
            />
            <div className="user-details">
              <h1>{user.userName}</h1>
              <h2>{user.email}</h2>
            </div>
            {!userService.isOwnUser(loggedUser, id) && (
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
          </div>
          <PostsFeed
            posts={userPosts}
            enterPost={enterPost}
            deletePost={deletePost}
            getPosts={getUserPosts}
          />
        </div>
      )}
    </section>
  );
};
