import "./App.css";
import { useEffect } from "react";
import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { useStateContext } from "./contexts/contextProvider.jsx";
import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import {
  Calendar,
  Committees,
  Editor,
  Event,
  Login,
  Signup,
  Home,
  PendingRequests,
  Signupteach,
} from "./pages";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.value);
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <div className="flex relative dark:bg-main-dark-bg">
                  <div
                    className="fixed right-4 bottom-4"
                    style={{ zIndex: "1000" }}
                  >
                    <button
                      type="button"
                      onClick={() => setThemeSettings(true)}
                      style={{ background: currentColor, borderRadius: "50%" }}
                      className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                    >
                      <FiSettings />
                    </button>
                  </div>
                  {activeMenu ? (
                    <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                      <Sidebar />
                    </div>
                  ) : (
                    <div className="w-0 dark:bg-secondary-dark-bg">
                      <Sidebar />
                    </div>
                  )}
                  <div
                    className={
                      activeMenu
                        ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                        : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
                    }
                  >
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                      <Navbar />
                    </div>
                    <div>
                      {themeSettings && <ThemeSettings />}
                      <Outlet />
                    </div>
                    <Footer />
                  </div>
                </div>
              ) : (
                <Home />
              )
            }
          >
            <Route path="/committees" index element={<Committees />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/calendar" element={<Calendar />} />
          </Route>
          <Route path="/pending-requests" element={<PendingRequests />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/events" element={<Event />} />
          <Route path="/signupteach" element={<Signupteach />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
