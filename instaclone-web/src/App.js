import {useReactiveVar} from "@apollo/client";
import React,{useState} from "react";
import {HashRouter as Router ,Route,Switch} from "react-router-dom";
import { isLoggedInVar,darkModeVar } from './apollo';
import {ThemeProvider} from "styled-components";
import Home  from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
const lightTheme = {
  fontColor: "#2c2c2c",
  bgColor: "lightgray",
};

const darkTheme = {
  fontColor: "lightgray",
  bgColor: "#2c2c2c",
};

function App() {
  const isLoggedIn=useReactiveVar(isLoggedInVar);
  const darkMode=useReactiveVar(darkModeVar);
  console.log(darkMode);
  return(
    <ThemeProvider theme={darkMode ? darkTheme:lightTheme}>
      <Router>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn? <Home /> :<Login />}
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider> 
    );
}

export default App;
