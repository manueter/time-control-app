import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Clock from "./pages/ClockPage";
import SideBar from "./components/SideBar";
import Calendar from "./pages/Calendar";

import SettingsPage from "./pages/SettingsPage";

// import ProtectedRoute from "./pages/ProtectedRoute";
function App() {
  return (
    <div className="full-height-container">
      <SideBar />
      <Routes>
        <Route path="/" element={<Clock />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="clock" element={<Clock />} />
        <Route path="calendar" element={<Calendar />} />
        
        <Route path="settingsPage" element={<SettingsPage />} />
        {/*<Route element={<ProtectedRoute />}>
          
        </Route> */}
      </Routes>
    </div>
  );
}

export default App;
