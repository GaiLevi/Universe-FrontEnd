import "./App.css";
import "./views/Feed";
import "./assets/style/main.scss";
import routes from "./routes.ts";
import { Route, Routes } from "react-router-dom";
import { AppHeader } from "./components/AppHeader";

const App = () => {
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
              element={route.element()}
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
