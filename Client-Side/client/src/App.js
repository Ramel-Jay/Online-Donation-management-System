import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import DonateNow from "./pages/Cash/donateNow";
import About from "./pages/About/About";
import InKind from "./pages/In-Kind/inKind";
import Contact from "./pages/Contacts/Contacts";
import InvalidRoute from "./pages/InvalidRoute/InvalidRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/Cash" exact element={<DonateNow />} />
          <Route path="/About" exact element={<About />} />
          <Route path="/In-Kind" exact element={<InKind />} />
          <Route path="/Contact" exact element={<Contact />} />
          <Route path="*" element={<InvalidRoute />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
