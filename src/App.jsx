import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import "./App.css";
import "./assets/style/main.scss";
import { loggedInUser } from "./atoms/loggedInUser";
import { AppHeader } from "./components/AppHeader";
import routes from "./routes.ts";
import { authService } from "./services/auth-service";
import "./views/Feed";
import { socketService } from "./services/socket.service.js";
import { loggedInUserState } from "./selectors/loggedInUser-selector.js";
const App = () => {
  const [loggedUser, setLoggedUser] = useRecoilState(loggedInUser);
  const currentUser = useRecoilValue(loggedInUserState);

  const navigate = useNavigate();
  const location = useLocation();
  async function setUserToken() {
    try {
      const user = await authService.getLoggedUser();
      console.log("user - set user token", user);
      if (!user) {
        navigate("/login");
      } else {
        const pathName = location.pathname;
        if (pathName === "/login" || pathName === "/signup") {
          navigate("/");
        }
        setLoggedUser(user);
      }
    } catch (error) {
      navigate("/login");
    }
  }
  // useEffect(() => {
  //   console.log("use effect app");

  //   setUserToken();
  // }, []);
  useEffect(() => {
    console.log("use effect app (mount)");

    async function checkUserAndNavigate() {
      try {
        const user = await authService.getLoggedUser();
        console.log("user - set user token", user);

        if (!user) {
          console.log(location.hash);
          // Check if the hash part of the URL is empty or "/"; navigate to login if true
          if (!window.location.hash || window.location.hash.startsWith("#/")) {
            navigate("/login");
          }
        } else {
          const pathName = window.location.pathname;
          if (pathName === "/login" || pathName === "/signup") {
            navigate("/");
          }
          setLoggedUser(user);
        }
      } catch (error) {
        navigate("/login");
      }
    }

    checkUserAndNavigate();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socketService.emit("setup-socket", currentUser._id);
    }
  }, [currentUser]);

  return (
    <div className="App">
      {/* Header */}
      <AppHeader />
      {/* Routes */}
      <div className="app-content">
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              element={<route.element />}
              path={route.path}
            />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default App;
