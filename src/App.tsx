import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Clock from "./pages/Clock";
import SideBar from "./components/SideBar";
import Calendar from "./components/Calendar";
import CalendarOp from "./components/CalendarOp";
function App() {

  return (
    <div className="full-height-container">
      <SideBar/>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="clock" element={<Clock />} />
        <Route path="calendarop" element={<CalendarOp />} />
        <Route path="calendar" element={<Calendar />} />
      </Routes>
    </div>
  );
}

export default App;
