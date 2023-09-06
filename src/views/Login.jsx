import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { authService } from "../services/auth-service";
import { useState } from "react";

export const Login = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const submitForm = async (info) => {
    setErrorMsg("");
    try {
      const user = await authService.login(info);
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
