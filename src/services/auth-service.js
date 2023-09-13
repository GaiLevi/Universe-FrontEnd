import { httpService } from "./http.service";

async function login(user) {
  try {
    return await httpService.post("/auth", user);
  } catch (error) {
    throw error.response.data.message;
  }
}
async function getLoggedUser() {
  try {
    return await httpService.get("/auth");
  } catch (error) {
    throw error;
  }
}

async function logoutUser() {
  try {
    await httpService.post("/auth/logout");
  } catch (error) {
    throw error;
  }
}

export const authService = { login, getLoggedUser, logoutUser };
