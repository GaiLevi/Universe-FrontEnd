import { useEffect, useState } from "react";
import {
  useParams,
  useSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { httpService } from "../services/http.service";
import { Post } from "../components/Post";
import { postService } from "../services/post-service";

export const SinglePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState();
  async function getPost(id) {
    const post = await httpService.get(`/posts/${id}`);
    setPost(post);
  }
  useEffect(() => {
    getPost(id);
  }, [id]);

  async function onDelete() {
    await postService.deletePost(id);
    navigate("/");
  }
  async function onEdit() {
    await postService.editPost({ ...post, text: (post.text += "!") });
    await getPost(id);
  }
  return (
    <section className="single-post">
      {post && (
        <Post post={post} deletePost={onDelete} editPost={onEdit} isEdit />
      )}
    </section>
  );
};
