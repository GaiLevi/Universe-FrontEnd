import { httpService } from "./http.service";

async function login(user) {
  try {
    await httpService.post("/auth", user);
  } catch (error) {
    throw error.response.data.message;
  }
}

export const authService = { login };
