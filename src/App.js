import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import About from "./components/about/about";
import Home from "./components/home/home";
import Sidebar from "./components/sidebar/sidebar"
import Worldwide from "./components/worldwide/worldwide";

import "./App.css";

function App() {
  return (
    <div className="body">
      <Router>
        <div className="content">
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/worldwide">
              <Worldwide />
            </Route>
            <Route path="/demo">
              <Home useDemo={true} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>

        <Sidebar />
      </Router>
    </div>
  );
}

export default App;
