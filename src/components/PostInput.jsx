import { httpService } from "../services/http.service";
import { Button } from "./common/Button";
import { useState } from "react";
export const PostInput = () => {
  let [input, setInput] = useState("");

  function onInput(event) {
    const text = event.target.value;
    setInput(text);
  }

  async function post() {
    const user = await httpService.post("/posts", { text: input });
    // console.log(input);
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
