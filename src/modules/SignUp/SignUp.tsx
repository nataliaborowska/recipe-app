import React from 'react';
import {Button, Form, Input, Typography} from 'antd';

import {AppRoutesEnum} from '../../utils/AppRoutesEnum';
import {SignUpForm} from './SignUpForm';

import modules from './SignUp.module.scss';

export class SignUp extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    signUpError: false,
  }

  onFormSubmit = (values: any) => {
    console.warn(values);
  }

  onFormSubmitFailed = () => {

  }

  render() {
    return (
      <div className={modules.signUp}>
        <Typography>Sign Up</Typography>

        <SignUpForm
          onFormSubmit={this.onFormSubmit}
          onFormSubmitFailed={this.onFormSubmitFailed}
        />
      </div>
    );
  }
}
