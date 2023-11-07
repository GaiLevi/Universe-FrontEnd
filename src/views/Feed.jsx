import { useEffect, useState } from "react";
import { PostInput } from "../components/PostInput.jsx";
import { PostsFeed } from "../components/PostsFeed.jsx";
import { httpService } from "../services/http.service.js";
import { useNavigate, useParams } from "react-router-dom";
import { postService } from "../services/post-service.js";
import { loggedInUserState } from "../selectors/loggedInUser-selector.js";
import { useRecoilValue } from "recoil";
import { Loader } from "../components/common/Loader.jsx";
export const Feed = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const user = useRecoilValue(loggedInUserState);
  const [isLoader, setIsLoader] = useState(true);
  useEffect(() => {
    getPosts();
  }, [user]);
  async function getPosts() {
    console.log("here");
    if (user) {
      console.log("here2");
      const posts = await postService.getPosts(user._id);
      console.log(posts);
      setPosts(posts);
      setIsLoader(false);
    }
  }
  async function deletePost(id) {
    await postService.deletePost(id);
    setPosts(await postService.getPosts(user._id));
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
      {isLoader && <Loader />}
    </section>
  );
};
