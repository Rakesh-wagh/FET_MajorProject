import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Homepage from "./Pages/Homepage/Homepage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
