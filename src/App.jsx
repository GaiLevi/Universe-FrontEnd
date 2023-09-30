import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import "./App.css";
import "./assets/style/main.scss";
import { loggedInUser } from "./atoms/loggedInUser";
import { AppHeader } from "./components/AppHeader";
import routes from "./routes.ts";
import { authService } from "./services/auth-service";
import "./views/Feed";
const App = () => {
  const [loggedUser, setLoggedUser] = useRecoilState(loggedInUser);
  const navigate = useNavigate();
  const location = useLocation();
  async function setUserToken() {
    const user = await authService.getLoggedUser();
    if (!user) {
      navigate("/login");
    } else {
      const pathName = location.pathname;
      if (pathName === "/login" || pathName === "/signup") {
        navigate("/");
      }
      setLoggedUser(user);
    }
  }
  useEffect(() => {
    setUserToken();
  }, []);
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

const arr = [1, 2, 3, 4];

export default App;
