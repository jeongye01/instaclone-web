import React from "react";
import { useState} from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { isLoggedInVar,darkModeVar, logUserIn } from '../apollo';
import {
  faFacebook,
  faFacebookF,
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import routes from "../routes";
import AuthLayout from '../components/auth/AuthLayout';
import { BaseBox } from '../components/shared';
import Button from '../components/auth/Button';
import Separator from '../components/auth/Separator';
import Input from '../components/auth/Input';
import FormBox from '../components/auth/FormBox';
import BottomBox from '../components/auth/BottomBox';
import PageTitle from '../components/PageTitle';
import FormError from '../components/auth/FormError';
import { gql, useMutation } from '@apollo/client';



const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const LOGIN_MUTATION=gql`
  mutation login($username:String!,$password:String!){
    login(username:$username,password:$password){
      ok
      token
      error
    }
  }

`;
const Login=()=>{
  const {register,handleSubmit,errors,formState,getValues,setError,clearErrors}=useForm({
    mode:"onChange",
  });
  const onCompleted=(data)=>{
    const {login:{ok,error,token}}=data;
    if(!ok){
      return setError("result",{message:error});
    }
    if(token){
     logUserIn(token);
    }
  }
  const [login,{loading}]=useMutation(LOGIN_MUTATION,{
    onCompleted,
  });
  const onSubmitValid=(data)=>{
    if(loading)
     { return;}
    
    const {username,password}=getValues();
    login({variables:{username,password}});
  }
  const clearLoginError=()=>clearErrors("result");
 
  return (
    <AuthLayout>
      <PageTitle title="Login"/>
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input ref={register({
            required:"Username is required",
            minLength:{
              value:5,
              message:"Username should be longer than 5 chars."
            }
          })} 
            onChange={clearLoginError} name="username" type="text" placeholder="Username" 
              hasError={Boolean(errors?.username?.message)}/>
            <FormError message={errors?.username?.message}/>
          <Input ref={register({
            required:"Password is required"
          })} onChange={clearLoginError} name="password" type="password" placeholder="Password" 
          hasError={Boolean(errors?.password?.message)} />
          <FormError message={errors?.password?.message}/>
          <Button type="submit" value={loading?"Loading...":"Log In"} disabled={!formState.isValid || loading}/>
          <FormError message={errors?.result?.message}/>
        </form>
        <Separator>
            <div></div>
            <span>Or</span>
            <div></div>
        </Separator>
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox 
        cta="Don't have an account?"
        linkText="Sign up"
        link={routes.signUp}
      />
    </AuthLayout> 
  );
};
export default Login;