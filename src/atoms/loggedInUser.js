import { atom } from "recoil";

export const loggedInUser = atom({
  key: "loggedInUser", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
