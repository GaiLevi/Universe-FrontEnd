import { useNavigate } from "react-router-dom";
import { Button } from "./common/Button";
import { useState } from "react";

export const SignUpForm = ({ submitForm }) => {
  function onInput(event) {
    setInfo({ ...info, [event.target.name]: event.target.value });
  }
  function onSubmit(event) {
    setErrorMsg("");
    event.preventDefault();
    if (info.userName.length <= 5) {
      setErrorMsg("UserName is not valid (more than 5 characters).");
      return;
    }
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

    if (!emailRegex.test(info.email)) {
      setErrorMsg("Email is not valid.");
      return;
    }
    if (info.password !== info.confirmPassword || info.password.length < 6) {
      setErrorMsg(
        "password isn't valid or is not matched with the confirmation."
      );
      return;
    }
    const user = { ...info };
    delete user.confirmPassword;
    submitForm(user);
  }

  const [errorMsg, setErrorMsg] = useState("");
  const [info, setInfo] = useState({});
  const navigate = useNavigate();
  return (
    <section className="signup-form">
      <div className="title-container">
        <img src={require("../assets/imgs/logo.svg").default} alt="logo" />
        <h1>SignUp</h1>
      </div>
      <form onSubmit={onSubmit}>
        <input
          onInput={onInput}
          type="text"
          placeholder="User Name"
          name="userName"
          required
        />
        <input
          onInput={onInput}
          type="email"
          placeholder="Email"
          name="email"
          required
        />
        <input
          onInput={onInput}
          type="password"
          placeholder="Password"
          name="password"
          required
        />
        <input
          onInput={onInput}
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          required
        />
        <input
          onInput={onInput}
          type="text"
          placeholder="Profile image URL"
          name="profileImage"
        />
        <div className="button-container">
          <Button label={"Back to login"} onClick={() => navigate("/login")} />
          <Button label={"SignUp"} />
        </div>
      </form>
      <p className="error-msg">{errorMsg}</p>
    </section>
  );
};
