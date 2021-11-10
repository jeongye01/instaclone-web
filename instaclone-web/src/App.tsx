import React from "react";
import styled,{ThemeProvider} from "styled-components";
import {ourTheme} from "./styles";

interface IContainerProps{
  floating:boolean;
}
const Container=styled.div<IContainerProps>`
   background-color:${props=>props.theme.bgColor};
   color:${props=>props.theme.fontColor};
   box-shadow: ${props=>(props.floating ? "":"")};
`;
const App=()=>{
  return (
    <ThemeProvider theme={ourTheme}>
      <Container floating={true}>App</Container>
    </ThemeProvider> 
  );
}

export default App;