import { useParams } from "react-router-dom";
import { userService } from "../services/user-service";
import { useEffect, useState } from "react";

export const ProfilePage = () => {
  useEffect(() => {
    getUser();
  }, []);
  const [user, setUser] = useState();
  const { id } = useParams();
  async function getUser() {
    setUser(await userService.getUserById(id));
  }
  return (
    <section className="profile-page">
      {user && (
        <div>
          <h1>{user.userName}</h1>
          <h2>{user.email}</h2>
        </div>
      )}
    </section>
  );
};
