import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import CashUpdateRequest from "./pages/CashUpdateRequest/CashUpdateRequest";
import CashDisapprove from './pages/CashDisapprove/CashDisapprove';
import CashApprove from "./pages/CashApprove/CashApprove";
import Home from "./pages/Home/Home";
import Dashboard from './pages/Dashboard/Dashboard';
import InKindApprove from "./pages/InKindApprove/InKindApprove";
import InKindDisapprove from "./pages/InKindDisapprove/InKindDisapprove";
import InKindUpdateRequest from "./pages/InKindUpdateRequest/InKindUpdateRequest";
import Registration from "./pages/Registration/Registration";
import CashPending from "./pages/CashPending/CashPending";
import InKindPending from "./pages/InKindPending/InKindPending";
import Login from "./pages/Login/Login";
import InvalidRoute from "./pages/InvalidRoute";
import LogOut from "./pages/LogOut";

function App() {


  return (
    <div className="App">
      <Router>

        <Routes>
          <Route path="/" exact element={<Home />}/>
          <Route path="/cashdisapprove" exact element={<CashDisapprove />} />
          <Route path="/cashupdaterequest/:id" exact element={<CashUpdateRequest />} />
          <Route path="/cashapprove" exact element={<CashApprove />} />
          <Route path="/inkindapprove" exact element={<InKindApprove />} />
          <Route path="/inkinddisapprove" exact element={<InKindDisapprove/>}/>
          <Route path="/inkindupdaterequest/:id" exact element={<InKindUpdateRequest />}/>
          <Route path="/registration" exact element={<Registration />}/>
          <Route path="/cashpending" exact element={<CashPending/>} />
          <Route path="/inkindpending" exact element={<InKindPending/> } />
          <Route path="/logout" exact element={<LogOut />}/>
          <Route path="/login" exact element={<Login />}/>
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="*" element={<InvalidRoute />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
