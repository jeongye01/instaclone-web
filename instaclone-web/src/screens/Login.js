import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { isLoggedInVar,darkModeVar } from '../apollo';

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;
const Container = styled.div`
   background-color: ${(props) => props.theme.bgColor};
`;

const Login=()=>{
 
  return (
    <Container>
      <Title>Login</Title>
      <button onClick={() => darkModeVar(true)}>To dark</button>
      <button onClick={() => darkModeVar(false)}>To light</button>
    </Container>
  );
};
export default Login;