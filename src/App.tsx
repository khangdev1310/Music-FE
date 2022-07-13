import { FC, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./auth";
import Audio from "./components/Audio";

import NavBar from "./components/NavBar";
import Home from "./features/Home";

const App: FC = () => {
  const [token, setToken] = useState<string | null>("");

  useEffect(() => {
    const hash: string = window.location.hash;
    const accessToken: string | null = localStorage.getItem("token");
    if (!accessToken && hash) {
      let _token: string = hash.split("&")[0].split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", _token);
      setToken(_token);
    } else {
      setToken(accessToken);
    }
  }, []);

  return !token ? (
    <Login />
  ) : (
    <div className="App">
      <div className="min-h-full">
        <NavBar />
        <Routes>
          <Route index element={<Home />} />
          
        </Routes>
      </div>

      <Audio />
    </div>
  );
};

export default App;
