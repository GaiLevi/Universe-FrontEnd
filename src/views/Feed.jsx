import { useEffect, useState } from "react";
import { PostInput } from "../components/PostInput.jsx";
import { PostsFeed } from "../components/PostsFeed.jsx";
import { httpService } from "../services/http.service.js";
import { useNavigate, useParams } from "react-router-dom";
import { postService } from "../services/post-service.js";
import { loggedInUserState } from "../selectors/loggedInUser-selector.js";
import { useRecoilValue } from "recoil";
export const Feed = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const user = useRecoilValue(loggedInUserState);
  useEffect(() => {
    getPosts();
  }, []);
  async function getPosts() {
    const posts = await httpService.get("/posts");
    setPosts(posts);
  }
  async function deletePost(id) {
    await postService.deletePost(id);
    setPosts(await postService.getPosts());
  }
  async function enterPost(id) {
    navigate(`/post/${id}`);
  }
  return (
    <section className="feed">
      <PostInput getPosts={getPosts}></PostInput>
      <PostsFeed
        posts={posts}
        deletePost={deletePost}
        enterPost={enterPost}
        getPosts={getPosts}
      ></PostsFeed>
    </section>
  );
};
