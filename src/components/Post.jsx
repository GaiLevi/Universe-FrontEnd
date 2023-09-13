export const Post = ({
  post,
  deletePost,
  enterPost,
  editPost,
  isEnter,
  isEdit,
}) => {
  function onDelete() {
    deletePost(post._id);
  }
  function onEnter() {
    enterPost(post._id);
  }
  function onEdit() {
    editPost(post._id);
  }
  function getFullDate(timeStamp) {
    const date = new Date(timeStamp);
    const dateString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}  ${date.getHours()}:${
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
    }`;
    return dateString;
  }
  return (
    <section className="post">
      <p className="user-name">{post.user.userName}</p>
      <p className="text">{post.text}</p>
      <p className="time-stamp">{getFullDate(post.timeStamp)}</p>
      <div className="action-buttons">
        <img
          src={require("../assets/imgs/delete.svg").default}
          onClick={onDelete}
          alt="delete"
        />
        {isEnter && (
          <img
            src={require("../assets/imgs/enter-post.svg").default}
            onClick={onEnter}
            alt="enter"
          />
        )}
        {isEdit && (
          <img
            src={require("../assets/imgs/edit.svg").default}
            onClick={onEdit}
            alt="edit"
          />
        )}
      </div>
    </section>
  );
};
