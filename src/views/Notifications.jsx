import { useRecoilState, useRecoilValue } from "recoil";
import { loggedInUserState } from "../selectors/loggedInUser-selector";
import { useEffect, useState } from "react";
import { Notification } from "../components/Notification";
import { loggedInUser } from "../atoms/loggedInUser";
import { userService } from "../services/user-service";

export const Notifications = () => {
  const loggedUser = useRecoilValue(loggedInUserState);
  const [currentUser, setCurrentUser] = useRecoilState(loggedInUser);
  const [isUser, setIsUser] = useState(false);
  const [nots, setNots] = useState([]);
  useEffect(() => {
    if (loggedUser && !isUser) {
      setIsUser(true);
      getUser();
      setNots(loggedUser.notifications);
    }
  }, [loggedUser]);
  async function getUser() {
    const user = await userService.getUserById(loggedUser._id);
    setCurrentUser(user);
  }
  return (
    <section className="notifications">
      {nots.map((not, index) => {
        return <Notification key={index} notification={not} />;
      })}
    </section>
  );
};
