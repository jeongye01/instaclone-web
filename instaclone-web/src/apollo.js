import {ApolloClient,InMemoryCache,makeVar} from "@apollo/client";


export const isLoggedInVar=makeVar(Boolean(localStorage.getItem(TOKEN)));
export const darkModeVar=makeVar(false);
const TOKEN="token";

export const logUserIn=(token)=>{
  localStorage.setItem(TOKEN,token);
  
};

export const logUserOut=()=>{
  localStorage.removeItem(TOKEN);
 window.location.reload();
};

export const client=new ApolloClient({
  uri:"http://localhost:4000/graphql",
  cache:new InMemoryCache(),
});

