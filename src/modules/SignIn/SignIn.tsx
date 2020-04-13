import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {Spin, Typography} from 'antd';

import {AppRoutesEnum} from '../../utils/AppRoutesEnum';
import {ErrorModal} from '../../common/ErrorModal';
import {SignInForm} from './SignInForm';
import {withFirebase} from '../../components/Firebase';
import {signIn} from '../../store/actions/auth';

import modules from './SignIn.module.scss';

interface IPropTypes {
  authenticationError?: string;
  authenticationIsLoading: boolean;
  firebase: any;
  isAuthenticated: boolean;
  signIn: (email: string, password: string, firebase: any) => any;
}

interface IState {
  isErrorModalVisible: boolean;
  isFormValid: boolean;
  signInError: boolean;
}

class SignIn extends React.Component<IPropTypes, IState> {
  state = {
    isErrorModalVisible: false,
    isFormValid: false,
    signInError: false,
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.authenticationError !== this.props.authenticationError && this.props.authenticationError) {
      this.setState({isErrorModalVisible: true});
    }
  }

  handleCloseErrorModal = () => {
    this.setState({
      isErrorModalVisible: false,
    });
  }

  handleFormFieldsChanged = (changedFields: any, allFields: any) => {
    const formInvalidFields = allFields.filter((field: any) => {
      if (!field.value || field.errors.length > 0) {
        return field;
      }
    });

    if (formInvalidFields.length === 0) {
      this.setState({isFormValid: true});
    } else {
      this.setState({isFormValid: false});
    }
  }

  handleFormSubmit = (values: any) => {
    this.props.signIn(values.email, values.password, this.props.firebase);
  }

  handleFormSubmitFailed = () => {
    this.setState({signInError: true});
  }

  render() {
    if (this.props.isAuthenticated) {
      return (<Redirect to={AppRoutesEnum.RECIPES_LIST} />);
    }

    return (

      <div className={modules.signIn}>
        <Typography>Sign In</Typography>

        {this.props.authenticationIsLoading ?
          <Spin />
          :
          <SignInForm
            isFormValid={this.state.isFormValid}
            onFormFieldsChange={this.handleFormFieldsChanged}
            onFormSubmit={this.handleFormSubmit}
            onFormSubmitFailed={this.handleFormSubmitFailed}
          />
        }

        <p><Link to={AppRoutesEnum.REMIND_PASSWORD}>Forgot Password?</Link></p>

        <p>Or <Link to={AppRoutesEnum.SIGN_UP}>Sign Up</Link> if you don't have an account yet.</p>

        {this.props.authenticationError &&
          <ErrorModal
            isVisible={this.state.isErrorModalVisible}
            errorMessage={this.props.authenticationError}
            onCloseErrorModal={this.handleCloseErrorModal}
            modalTitle="Sign in error"
          />
        }
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    authenticationError: state.auth.authError,
    authenticationIsLoading: state.auth.authIsLoading,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

const WrappedComponent = connect(mapStateToProps, {signIn})(withFirebase(SignIn));

export {WrappedComponent as SignIn};

