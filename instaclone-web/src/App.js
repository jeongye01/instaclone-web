import {useReactiveVar} from "@apollo/client";
import React,{useState} from "react";
import {HashRouter as Router ,Route,Switch} from "react-router-dom";
import { isLoggedInVar,darkModeVar,client } from './apollo';
import {ThemeProvider} from "styled-components";
import {darkTheme,lightTheme,GlobalStyles} from "./styles";
import routes from "./routes";
import Home  from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import NotFound from "./screens/NotFound";
import { HelmetProvider } from "react-helmet-async";
import { ApolloProvider } from '@apollo/client';
import Header from "./components/Header";
import Layout from "./components/Layout";

function App() {
  const isLoggedIn=useReactiveVar(isLoggedInVar);
  const darkMode=useReactiveVar(darkModeVar);
  console.log(darkMode);
  return(
    <ApolloProvider client={client}>
    <HelmetProvider>
    <ThemeProvider theme={darkMode ? darkTheme:lightTheme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path={routes.home} exact>
          {isLoggedIn ? (
                  <Layout>
                    <Home />
                  </Layout>
                ) : (
                  <Login />
                )}
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
    </ApolloProvider >
    );
}

export default App;
