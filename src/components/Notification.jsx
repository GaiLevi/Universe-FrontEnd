import { useEffect, useState } from "react";
import { UserDisplay } from "../components/UserDisplay";
import { userService } from "../services/user-service";
import { useNavigate } from "react-router-dom";

export const Notification = ({ notification }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    fetchUser();
  }, []);
  async function fetchUser() {
    const provoker = await userService.getUserById(notification.provokerId);
    setUser(provoker);
  }
  function getNotificationMsg() {
    switch (notification.action) {
      case "Like":
        return "liked your post.";
      case "Comment":
        return "commented on your post.";
      case "CommentLike":
        return "liked your comment.";
      case "follow":
        return "started following you.";
      default:
        return "";
    }
  }
  return (
    <section className="notification">
      <UserDisplay user={user} renderFollow={false} />
      <p
        onClick={() => {
          if (notification.action === "follow") {
            navigate(`/profile/${notification.provokerId}`);
          } else {
            navigate(`/post/${notification.postId}/view`);
          }
        }}
        className="not-msg"
      >
        {getNotificationMsg()}
      </p>
    </section>
  );
};
