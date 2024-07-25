import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
// import Home from "./pages/home/Home copy";
import "./App.css";
// import StationDetails from "./pages/stationPage/StationDetails";
import Navbar from "./components/layout/Header";
// import Footer from "./components/layout/Footer";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/station/:station" element={<StationDetails />} /> */}
      </Routes>

      {/* <Footer /> */}
    </>
  );
}

export default App;
