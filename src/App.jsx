import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import "./App.css";
import "./assets/style/main.scss";
import { loggedInUser } from "./atoms/loggedInUser";
import { AppHeader } from "./components/AppHeader";
import routes from "./routes.ts";
import { loggedInUserState } from "./selectors/loggedInUser-selector";
import { authService } from "./services/auth-service";
import "./views/Feed";
const App = () => {
  const [loggedUser, setLoggedUser] = useRecoilState(loggedInUser);
  const user1 = useRecoilValue(loggedInUserState);
  const navigate = useNavigate();
  async function setUserToken() {
    const user = await authService.getLoggedUser();
    if (!user) {
      navigate("/login");
    } else {
      navigate("/");
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
