import { useNavigate } from "react-router-dom";
import { SignUpForm } from "../components/SignUpForm";
import { userService } from "../services/user-service";
import { loggedInUser } from "../atoms/loggedInUser";
import { useRecoilState } from "recoil";
import { authService } from "../services/auth-service";
export const SignUp = () => {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useRecoilState(loggedInUser);

  async function submitForm(info) {
    const user = await userService.signUpUser(info);
    await authService.login(user);
    setLoggedUser(user);
    navigate("/");
  }
  return (
    <section className="sign-up">
      <SignUpForm submitForm={submitForm} />
    </section>
  );
};
