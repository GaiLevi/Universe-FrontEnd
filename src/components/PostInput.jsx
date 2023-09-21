import { httpService } from "../services/http.service";
import { Button } from "./common/Button";
import { useState } from "react";
import { loggedInUserState } from "../selectors/loggedInUser-selector";
import { useRecoilValue } from "recoil";
export const PostInput = ({ getPosts }) => {
  let [input, setInput] = useState("");
  const user = useRecoilValue(loggedInUserState);
  function onInput(event) {
    const text = event.target.value;
    setInput(text);
  }
  // window.addEventListener("keydown", (ev) => {
  //   if (ev.key === "Enter") {
  //     console.log(user);
  //     // post();
  //   }
  // });
  async function post() {
    await httpService.post("/posts", {
      text: input,
      user: {
        id: user._id,
        userName: user.userName,
        profileImage: user.profileImage,
      },
    });
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
