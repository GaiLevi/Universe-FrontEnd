import { Feed } from "./views/Feed.jsx";
import { SinglePost } from "./views/SinglePost.jsx";
// Routes accesible from the main navigation (in AppHeader)
const routes = [
  {
    path: "/",
    element: Feed,
  },
  {
    path: "/post/:id",
    element: SinglePost,
  },
];

export default routes;
