import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
      <Router>
        <Switch>
            <Route path="/backtesting" render={Backtesting} />
        </Switch>
      </Router>
  );
}

export default App;
