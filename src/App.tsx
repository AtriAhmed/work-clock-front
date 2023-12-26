import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";

import "./App.css";
import AuthProvider from "./utils/contexts/AuthProvider";
import ThemeProvider from "./utils/contexts/ThemeProvider";

axios.defaults.baseURL = "http://localhost:5000/";
axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("");

  function getTheme() {
    document.body.classList.toggle("test");
    const t = localStorage.getItem("theme");
    if (!t) {
      setTheme("light");
    } else if (t == "light") {
      setTheme("light");
    } else {
      setTheme("dark");
      document.body.classList.add("dark");
    }
  }

  async function getUserStatus() {
    try {
      const res = await axios.get("/api/login/status");
      setUser(res.data.user);
      return res;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  useEffect(() => {
    getUserStatus();
    getTheme();
  }, []);

  return (
    <ThemeProvider state={{ theme, setTheme }}>
      <AuthProvider state={{ user, setUser }}>
        <div>
          <Outlet />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
