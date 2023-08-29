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
  return (
    <section className="post">
      <p className="text">{post.text}</p>
      <button onClick={onDelete}>Delete</button>
      {isEnter && <button onClick={onEnter}>Enter post</button>}
      {isEdit && <button onClick={onEdit}>Edit</button>}
    </section>
  );
};
