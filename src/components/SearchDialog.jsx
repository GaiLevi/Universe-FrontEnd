import { useEffect, useRef, useState } from "react";
import { utilService } from "../services/utils";
import { userService } from "../services/user-service";
import { UserDisplay } from "./UserDisplay";
import { Loader } from "./common/Loader";

export const SearchDialog = ({ isOpen, onClose }) => {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const debounceFunc = useRef(utilService.debounce(getUsers, 1500));

  async function onInput(event) {
    setIsLoader(true);
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
    setIsLoader(false);
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
        <div className="input-container">
          <input
            type="text"
            placeholder="Search for a user..."
            onInput={onInput}
            value={input}
          />
        </div>
        <div className="users-container">
          {users.length ? (
            <div className={isLoader ? "disabled" : ""}>
              {users.map((user, index) => {
                return (
                  <UserDisplay
                    renderFollow
                    key={index}
                    user={user}
                    onUserClick={onCloseDialog}
                  />
                );
              })}
            </div>
          ) : (
            <p>{input.length && !isLoader ? "Users not found" : ""}</p>
          )}
          {isLoader && input.length ? <Loader /> : <span />}
        </div>
      </div>
    </section>
  ) : (
    <span />
  );
};
