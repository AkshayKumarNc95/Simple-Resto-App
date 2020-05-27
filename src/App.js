import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/common/header";
import Home from "./components/home_page";
import About from "./components/about";
import Help from "./components/help";
import { getData, extractFilters } from "./utils/sample.js";


// This component will be holding the root state of the application
// so that even if a route is changed the read will not be lost...  
function App() {
  const [state, setState] = useState({ restaurants: [{}], filterItems: [] });
  useEffect((props) => {
    // Load the restaurants from the csv file
    // SetRestaurants
    const getD = async () => {
      const restos = await getData();
      const filters = extractFilters(restos);
      setState({ restaurants: restos, filterItems: filters });
    };

    getD();
  }, []); // Only once


  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <Home 
              restos={state.restaurants} 
              filters={state.filterItems} 
              />
            )}
          />
          <Route path="/About" component={About} />
          <Route path="/Help" component={Help} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
