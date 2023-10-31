import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EditDialog } from "../components/EditDialog";
import { Post } from "../components/Post";
import { postService } from "../services/post-service";

export const SinglePost = () => {
  const { id, isView } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const [isDialog, setIsDialog] = useState(false);
  async function getPost(id) {
    const postResult = await postService.getPost(id);
    setPost(postResult);
  }

  useEffect(() => {
    getPost(id);
  }, [id]);

  async function rerenderPost() {
    await getPost(id);
  }
  async function onDelete() {
    await postService.deletePost(id);
    navigate("/");
  }
  async function onEdit() {
    setIsDialog(true);
    await getPost(id);
  }
  async function editPost(text) {
    const editedPost = { ...post, text: text };
    await postService.editPost(editedPost);
    await getPost(id);
  }
  return (
    <section className="single-post">
      {post && (
        <Post
          post={post}
          deletePost={onDelete}
          editPost={onEdit}
          isEdit
          getPosts={rerenderPost}
          isView={isView === "view"}
        />
      )}
      <EditDialog
        editProperty={editPost}
        isOpen={isDialog}
        setIsDialog={setIsDialog}
        descripsion="Edit Post"
      />
    </section>
  );
};
