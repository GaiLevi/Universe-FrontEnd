import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loggedInUser } from "../atoms/loggedInUser";
import { LoginForm } from "../components/LoginForm";
import { authService } from "../services/auth-service";

export const Login = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [loggedUser, setLoggedUser] = useRecoilState(loggedInUser);
  const submitForm = async (info) => {
    setErrorMsg("");
    try {
      console.log(info);
      const user = await authService.login(info);
      console.log(user);
      setLoggedUser(user);
      navigate("/");
    } catch (error) {
      setErrorMsg(error);
    }
  };
  return (
    <section className="login">
      <LoginForm submitForm={submitForm} onSignUp={() => navigate("/signup")} />
      <p className="error-msg">{errorMsg}</p>
    </section>
  );
};
