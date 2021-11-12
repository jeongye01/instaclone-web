import React from "react";
import { useState } from "react";
import { isLoggedInVar,darkModeVar } from '../apollo';
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
import { FatLink } from "../components/shared";
import styled from 'styled-components';
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import { gql, useMutation } from '@apollo/client';
import { useHistory } from "react-router-dom";
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;
const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;
function SignUp(){
  const history = useHistory();
  const onCompleted = (data) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return;
    }
    history.push(routes.home,{message:"Account created. Please log in.",username,password});
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, errors, formState , getValues} = useForm({
    mode: "onChange",
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };
  return (
    <AuthLayout>
      <PageTitle title="Sign Up"/>
      <FormBox>
      <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input 
          ref={register({
            required:"First Name is Required.",
          })} type="text" placeholder="First Name" name="fistName"/>
          <Input 
          ref={register({
           
          })} type="text" placeholder="Last Name" name="lastName"/>
          <Input 
          ref={register({
            required:"Email is Required.",
          })} type="text" placeholder="Email" name="email"/>
          <Input 
          ref={register({
            required:"Username is Required.",
          })} type="text" placeholder="Username" name="username"/>
          <Input 
          ref={register({
            required:"Password is Required.",
          })} type="password" placeholder="Password" name="password"/>
           <Button type="submit" value={loading?"Loading...":"Sign Up"} disabled={!formState.isValid || loading}/>
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
    </AuthLayout>
    
  );
};
export default SignUp;