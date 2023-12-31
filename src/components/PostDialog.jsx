import { useEffect, useState } from "react";
import { Post } from "./Post";
import { Button } from "./common/Button";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "../selectors/loggedInUser-selector";
import { postService } from "../services/post-service";
import { useNavigate } from "react-router-dom";
import { utilService } from "../services/utils";
import { ConfirmDialog } from "./ConfirmDialog";
import { notificationService } from "../services/notification-service";

export const PostDialog = ({
  isOpen,
  setIsDialog,
  post,
  editPost,
  deletePost,
  getposts,
}) => {
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState();
  const [isDeleteCommentDialog, setIsDeleteCommentDialog] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState(null);

  const loggedUser = useRecoilValue(loggedInUserState);
  const navigate = useNavigate();
  function closeDialog() {
    setIsDialog(false);
  }
  function onDelete() {
    deletePost();
    setIsDialog(false);
  }
  function onCommentInput(event) {
    const text = event.target.value;
    setCommentInput(text);
  }
  async function OnClickComment() {
    if (commentInput.length > 0) {
      const user = {
        id: loggedUser._id,
        userName: loggedUser.userName,
        profileImage: loggedUser.profileImage,
      };
      const newComment = await postService.addComment(
        post._id,
        user,
        commentInput
      );
      const notification = {
        recieverId: post.user.id,
        action: "Comment",
        postId: post._id,
        commentId: newComment._id,
        provokerId: loggedUser._id,
      };
      if (notification.provokerId !== notification.recieverId) {
        await notificationService.toggleNotification(notification);
      }
      setCommentInput("");
      getposts();
    }
  }

  async function deleteComment(comment) {
    const commentId = comment._id;
    await postService.deleteComment(post._id, commentId);
    const notification = {
      recieverId: post.user.id,
      action: "Comment",
      postId: post._id,
      commentId: commentId,
      provokerId: loggedUser._id,
    };
    if (notification.provokerId !== notification.recieverId) {
      await notificationService.toggleNotification(notification);
    }
    getposts();
  }
  async function toggleCommentLike(comment) {
    const commentId = comment._id;
    await postService.toggleCommentLike(loggedUser._id, post._id, commentId);
    const notification = {
      recieverId: comment.user.id,
      action: "CommentLike",
      postId: post._id,
      commentId: commentId,
      provokerId: loggedUser._id,
    };
    if (notification.provokerId !== notification.recieverId) {
      await notificationService.toggleNotification(notification);
    }
    getposts();
  }
  function isUserLiked(comment) {
    if (loggedUser) {
      return comment.likes.includes(loggedUser._id);
    }
  }
  useEffect(() => {
    setComments([...post.comments].reverse());
  }, [post]);

  function openDeleteCommentDialog(commentId) {
    setCommentIdToDelete(commentId);
    setIsDeleteCommentDialog(true);
  }

  function closeDeleteCommentDialog() {
    setCommentIdToDelete(null);
    setIsDeleteCommentDialog(false);
  }

  return (
    isOpen && (
      <section className="post-dialog">
        <div className="black-screen" onClick={closeDialog}></div>
        <div className="post-container">
          {isOpen && (
            <Post
              className="post-dialog-header"
              post={post}
              // isEdit
              deletePost={onDelete}
              isComments
              getPosts={getposts}
            />
          )}
          {/* INPUT COMMENT */}
          <div className="input-comment-con">
            <input
              value={commentInput}
              onInput={onCommentInput}
              type="text"
              className="comment-input"
              placeholder="Write a comment.."
              required
            />
            <Button
              onClick={OnClickComment}
              label={"Comment"}
              style={{ height: "33px", marginInline: "10px" }}
            />
          </div>
          {/* COMMENTS CONTAINER */}
          <div className="comments-container">
            {comments.map((comment, index) => {
              return (
                <div className="comment-display" key={index}>
                  {/* COMMENT-HEADER */}
                  <div className="comment-header">
                    <div
                      className="user-display"
                      onClick={() => navigate(`/profile/${comment.user.id}`)}
                    >
                      <img
                        className="profile-img"
                        src={comment.user.profileImage}
                        alt="profile-img"
                      />
                      <p className="user-name">{comment.user.userName}</p>
                    </div>
                    <p className="time-stamp">
                      {utilService.getFullDate(comment.timeStamp)}
                    </p>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                  {/* COMMENT-FOOTER */}
                  <div className="comment-footer">
                    <div>
                      <img
                        className="like-btn"
                        onClick={() => toggleCommentLike(comment)}
                        src={
                          require(isUserLiked(comment)
                            ? "../assets/imgs/like-filled.svg"
                            : "../assets/imgs/like.svg").default
                        }
                        alt="like"
                      />
                      <p>{loggedUser && comment.likes.length}</p>
                    </div>
                    {comment.user.id === loggedUser._id ? (
                      <img
                        className="delete-img"
                        src={require("../assets/imgs/delete.svg").default}
                        alt="delete"
                        onClick={() => openDeleteCommentDialog(comment)}
                      />
                    ) : (
                      <br />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <ConfirmDialog
          isOpen={isDeleteCommentDialog}
          onCloseDialog={closeDeleteCommentDialog}
          onOk={() => deleteComment(commentIdToDelete)}
          description="Are you sure you want to delete the comment?"
        />
      </section>
    )
  );
};
