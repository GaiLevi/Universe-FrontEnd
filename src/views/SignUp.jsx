import { SignUpForm } from "../components/SignUpForm";
import { userService } from "../services/user-service";

export const SignUp = () => {
  async function submitForm(info) {
    await userService.signUpUser(info);
  }
  return (
    <section className="sign-up">
      <SignUpForm submitForm={submitForm} />
    </section>
  );
};
