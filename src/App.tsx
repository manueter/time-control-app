import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Clock from "./pages/ClockPage";
import SideBar from "./components/shared/SideBar";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile"

import SettingsPage from "./pages/SettingsPage";


function App() {
  return (
    <div className="full-height-container">
      <SideBar />
      <Routes>
        <Route path="/" element={<Clock />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/clock" element={<Clock />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settingsPage" element={<SettingsPage />} />
        {/*<Route element={<ProtectedRoute />}>
          
        </Route> */}
      </Routes>
    </div>
  );
}

export default App;
