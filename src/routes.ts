import { Feed } from "./views/Feed.jsx";
import { Login } from "./views/Login.jsx";
import { Notifications } from "./views/Notifications.jsx";
import { ProfilePage } from "./views/ProfilePage.jsx";
import { SignUp } from "./views/SignUp.jsx";
import { SinglePost } from "./views/SinglePost.jsx";
// Routes accesible from the main navigation (in AppHeader)
const routes = [
  {
    path: "/",
    element: Feed,
  },
  {
    path: "/post/:id/:isView?",
    element: SinglePost,
  },
  {
    path: "/login",
    element: Login,
  },
  {
    path: "/signup",
    element: SignUp,
  },
  {
    path: "/profile/:id",
    element: ProfilePage,
  },
  {
    path: "/notifications",
    element: Notifications,
  },
];

export default routes;
