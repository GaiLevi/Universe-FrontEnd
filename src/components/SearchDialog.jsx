import { useEffect, useRef, useState } from "react";
import { utilService } from "../services/utils";
import { userService } from "../services/user-service";
import { UserDisplay } from "./UserDisplay";

export const SearchDialog = ({ isOpen, onClose }) => {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const debounceFunc = useRef(utilService.debounce(getUsers, 1500));

  async function onInput(event) {
    const value = event.target.value;
    setInput(value);
    debounceFunc.current(value);
  }

  async function getUsers(value) {
    if (!value) {
      setUsers([]);
      return;
    }
    const users = await userService.getUsersByName(value);
    setUsers(users);
  }

  function onCloseDialog() {
    setInput("");
    setUsers([]);
    onClose();
  }
  return isOpen ? (
    <section className="search-dialog">
      <div className="black-screen" onClick={onCloseDialog}></div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a user..."
          onInput={onInput}
          value={input}
        />
        {users.map((user, index) => {
          return <UserDisplay key={index} user={user} />;
        })}
      </div>
    </section>
  ) : (
    <span />
  );
};
