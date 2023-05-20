import React from "react";
import "./App.css";
import Login from "./Components/Login";
import TrainDetail from "./Components/TrainDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./Context/UserContext";
import PnrChecker from "./Components/PNRChecker/PnrChecker";

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/traindetail" element={<TrainDetail />} />
            <Route path="/pnrdetail" element={<PnrChecker />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>

      {/* <Login /> */}
      {/* <Navbar />
      <TrainDetail /> */}
    </div>
  );
}

export default App;
