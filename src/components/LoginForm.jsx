import { useState } from "react";
import { Button } from "./common/Button";

export const LoginForm = ({ onSignUp, submitForm }) => {
  const [info, setInfo] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const onInput = (event) => {
    setInfo({ ...info, [event.target.name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setErrorMsg("");
    if (info.userName && info.password) {
      submitForm(info);
    } else {
      setErrorMsg("Properties are missing");
    }
  };
  return (
    <section className="login-form">
      <div className="title-container">
        <img src={require("../assets/imgs/logo.svg").default} alt="logo" />
        <h1>Login</h1>
      </div>
      <form onSubmit={onSubmit}>
        <input
          onInput={onInput}
          type="text"
          placeholder="User Name"
          name="userName"
        />
        <input
          onInput={onInput}
          type="password"
          placeholder="Password"
          name="password"
        />
        <div className="button-container">
          <Button label={"Login"} />
          <Button label={"SignUp"} onClick={onSignUp} />
        </div>
      </form>
      <p className="error-msg">{errorMsg}</p>
    </section>
  );
};
