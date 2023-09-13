import { httpService } from "./http.service";

async function signUpUser(user) {
  try {
    return await httpService.post("/users", user);
  } catch (error) {
    console.error(error);
  }
}

async function getUserById(id) {
  try {
    return await httpService.get(`/users/${id}`);
  } catch (error) {
    console.error(error);
  }
}

export const userService = { signUpUser, getUserById };
