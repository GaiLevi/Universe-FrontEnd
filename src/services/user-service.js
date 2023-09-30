import { httpService } from "./http.service";

async function signUpUser(user) {
  try {
    return await httpService.post("/users", user);
  } catch (error) {
    console.error(error);
    return error.response.data.message;
  }
}

async function getUserById(id) {
  try {
    return await httpService.get(`/users/${id}`);
  } catch (error) {
    console.error(error);
  }
}

async function toggleFollow(userId, followId) {
  try {
    return await httpService.post(`/users/follow/${userId}/${followId}`);
  } catch (error) {
    console.log(error);
  }
}

async function getUsersByName(userName) {
  try {
    return await httpService.get(`/users/names/${userName}`);
  } catch (error) {
    console.log(error);
  }
}
function isOwnUser(loggedUser, id) {
  return loggedUser._id === id;
}
export const userService = {
  signUpUser,
  getUserById,
  toggleFollow,
  getUsersByName,
  isOwnUser,
};
