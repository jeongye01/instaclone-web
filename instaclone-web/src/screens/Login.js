import React from "react";
import { useState } from "react";
import styled from "styled-components";
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
import PageTitle from '../components/PageTitle';




const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;
const Login=()=>{

  return (
    <AuthLayout>
      <PageTitle title="Login"/>
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form>
          <Input type="text" placeholder="Username" name="Username" />
          <Input type="password" placeholder="" name="Password" />
          <Button type="submit" value="Login"/>
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