import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Backtesting} from "./pages";

function App() {
  return (
      <Router>
        <Routes>
            <Route exact path="/" element={<Backtesting />} />
        </Routes>
      </Router>
  );
}

export default App;
