import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "../selectors/loggedInUser-selector";
import { postService } from "../services/post-service";
import { PostDialog } from "./PostDialog.jsx";
import { ShowMore } from "./common/ShowMore";
import { utilService } from "../services/utils";

export const Post = ({
  post,
  deletePost,
  enterPost,
  editPost,
  isEnter,
  isEdit,
  isComments,
  getPosts,
}) => {
  const loggedUser = useRecoilValue(loggedInUserState);
  const [isUserOwnPost, setIsUserOwnPost] = useState(false);
  useEffect(() => {
    if (post.user.id === loggedUser._id) {
      setIsUserOwnPost(true);
    }
  }, [post]);
  const navigate = useNavigate();
  const [isPostDialog, setIsPostDialog] = useState(false);
  function onDelete() {
    deletePost(post._id);
  }
  function onEnter() {
    enterPost(post._id);
  }
  function onEdit() {
    editPost(post._id);
  }

  async function toggleLike() {
    await postService.toggleLike(loggedUser._id, post._id);
    getPosts();
  }
  function isUserLiked() {
    if (loggedUser) {
      return post.likes.includes(loggedUser._id);
    }
  }
  async function OnClickComment() {
    if (isComments) return;
    setIsPostDialog(true);
  }
  return (
    <section className="post">
      {/* POST HEADER */}
      <div className="post-header">
        {/* USER DISPLAY */}
        <div
          className="user-display"
          onClick={() => navigate(`/profile/${post.user.id}`)}
        >
          <img
            className="profile-img"
            src={post.user.profileImage}
            alt="profile-img"
          />
          <p className="user-name">{post.user.userName}</p>
        </div>
        <p className="time-stamp">{utilService.getFullDate(post.timeStamp)}</p>
      </div>
      {/* POST TEXT */}
      <ShowMore text={post.text} maxLength={100} />
      {/* POST FOOTER */}
      <div className="post-footer">
        <div className="like-comment-btn">
          {/* LIKE BUTTON */}
          <div>
            <img
              className="like-btn"
              onClick={toggleLike}
              src={
                require(isUserLiked()
                  ? "../assets/imgs/like-filled.svg"
                  : "../assets/imgs/like.svg").default
              }
              alt="like"
            />
            <p>{post.likes.length}</p>
          </div>
          <div>
            <img
              className="comment-btn"
              onClick={OnClickComment}
              src={require("../assets/imgs/comment.svg").default}
              alt="comment"
            />
            <p>{post.comments.length}</p>
          </div>
        </div>
        {/* COMMENT BUTTON */}
        {/* ACTION BUTTONS */}
        <div className="action-buttons">
          {isUserOwnPost ? (
            <img
              className="action-btn"
              src={require("../assets/imgs/delete.svg").default}
              onClick={onDelete}
              alt="delete"
            />
          ) : (
            <div></div>
          )}
          {isEnter && (
            <img
              className="action-btn"
              src={require("../assets/imgs/enter-post.svg").default}
              onClick={onEnter}
              alt="enter"
            />
          )}
          {isEdit && isUserOwnPost && (
            <img
              className="action-btn"
              src={require("../assets/imgs/edit.svg").default}
              onClick={onEdit}
              alt="edit"
            />
          )}
        </div>
      </div>

      <div className="comments">
        <PostDialog
          isOpen={isPostDialog}
          setIsDialog={setIsPostDialog}
          deletePost={onDelete}
          post={post}
          getposts={getPosts}
        />
      </div>
    </section>
  );
};
