import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import { SignInAndSignOut } from './sign-in-and-sign-out.styled';


const SignInAndSignUpPage = () => (
    <SignInAndSignOut> 
      <SignIn />
      <SignUp />
    </SignInAndSignOut>
)

export default SignInAndSignUpPage;