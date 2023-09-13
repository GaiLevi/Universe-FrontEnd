import { atom, selector } from "recoil";
import { loggedInUser } from "../atoms/loggedInUser";
export const loggedInUserState = selector({
  key: "loggedInUserSelector", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(loggedInUser);

    return text;
  },
});
