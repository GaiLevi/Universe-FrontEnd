import { httpService } from "./http.service";

async function signUpUser(user) {
  try {
    await httpService.post("/users", user);
  } catch (error) {
    console.error(error);
  }
}

export const userService = { signUpUser };
