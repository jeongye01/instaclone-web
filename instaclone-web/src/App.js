import {useReactiveVar} from "@apollo/client";
import React,{useState} from "react";
import {HashRouter as Router ,Route,Switch} from "react-router-dom";
import { isLoggedInVar,darkModeVar } from './apollo';
import {ThemeProvider} from "styled-components";
import {darkTheme,lightTheme,GlobalStyles} from "./styles";
import routes from "./routes";
import Home  from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import NotFound from "./screens/NotFound";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const isLoggedIn=useReactiveVar(isLoggedInVar);
  const darkMode=useReactiveVar(darkModeVar);
  console.log(darkMode);
  return(
    <HelmetProvider>
    <ThemeProvider theme={darkMode ? darkTheme:lightTheme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path={routes.home} exact>
            {isLoggedIn? <Home /> :<Login />}
          </Route>
          {!isLoggedIn ? (
            <Route path={routes.signUp} exact>
            <SignUp />
            </Route>
          ):null}
          
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider> 
    </HelmetProvider>
    );
}

export default App;
