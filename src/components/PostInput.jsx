import { httpService } from "../services/http.service";
import { Button } from "./common/Button";
import { useState } from "react";
export const PostInput = ({ getPosts }) => {
  let [input, setInput] = useState("");

  function onInput(event) {
    const text = event.target.value;
    setInput(text);
  }

  async function post() {
    await httpService.post("/posts", { text: input });
    await getPosts();
    setInput("");
  }
  return (
    <section className="post-input">
      <input
        value={input}
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
