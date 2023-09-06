import { useState } from "react";
import { httpService } from "../services/http.service";
import { Button } from "./common/Button";

export const EditDialog = ({ isOpen, setIsDialog, editPost }) => {
  function closeDialog() {
    setIsDialog(false);
  }
  const [input, setInput] = useState("");

  function onInput(event) {
    const text = event.target.value;
    setInput(text);
  }

  async function onEditPost() {
    editPost(input);
    setInput("");
    closeDialog();
  }
  window.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      onEditPost();
    }
  });
  return (
    isOpen && (
      <div>
        <div className="black-screen" onClick={closeDialog}></div>
        <section className="edit-dialog">
          <div className="action-container">
            <input type="text" onInput={onInput} value={input} />
            <Button
              className="edit-btn"
              label={`Submit`}
              onClick={onEditPost}
            />
          </div>
        </section>
      </div>
    )
  );
};
