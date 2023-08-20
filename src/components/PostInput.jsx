import { httpService } from "../services/http.service";
import { postService } from "../services/posts.service";
import { Button } from "./common/Button";
import { useState } from "react";
export const PostInput = () => {
  let [input, setInput] = useState("");

  function onInput(event) {
    const text = event.target.value;
    setInput(text);
  }

  async function post() {
    const newPost = {text:input,date:new Date()};
    const post =  await postService.addPost(newPost);
    console.log(`post has printed ${JSON.stringify(post)}`);
  }
  return (
    <section className="post-input">
      <input
        onInput={onInput}
        type="text"
        className="input"
        placeholder="Write a post.."
      />
      <Button
        onClick={post}
        style={{ height: "52px", paddingInline: "30px" }}
        label={"Post"}
      ></Button>
    </section>
  );
};
