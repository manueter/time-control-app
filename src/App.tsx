import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Clock from "./pages/ClockPage";
import SideBar from "./components/SideBar";
import Calendar from "./components/Calendar";
function App() {

  return (
    <div className="full-height-container">
      <SideBar/>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="clock" element={<Clock />} />
        <Route path="calendar" element={<Calendar />} />
      </Routes>
    </div>
  );
}

export default App;
