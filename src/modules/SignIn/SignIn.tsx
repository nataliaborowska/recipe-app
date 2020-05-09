import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {Spin, Typography} from 'antd';

import {AppRoutesEnum} from '../../utils/AppRoutesEnum';
import {ErrorModal} from '../../common/ErrorModal';
import {IFirebase, withFirebase} from '../../components/Firebase';
import {signIn} from '../../store/actions/authActions/auth';
import {SignInForm} from './SignInForm';
import {IStoreState} from '../../store/store';

import modules from './SignIn.module.scss';

export interface IFormField {
  errors?: Array<string>;
  name?: string | number | (string | number)[];
  touched?: boolean;
  validating?: boolean;
  value?: string;
}

const mapStateToProps = (state: IStoreState) => {
  return {
    authenticationError: state.auth.authError,
    authenticationIsLoading: state.auth.authIsLoading,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

const mapDispatchToProps = {signIn};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IPropTypes extends PropsFromRedux {
  firebase: IFirebase;
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

  componentDidUpdate(prevProps: IPropTypes) {
    if (prevProps.authenticationError !== this.props.authenticationError && this.props.authenticationError) {
      this.setState({isErrorModalVisible: true});
    }
  }

  handleCloseErrorModal = () => {
    this.setState({
      isErrorModalVisible: false,
    });
  }

  handleFormFieldsChanged = (changedFields: Array<IFormField>, allFields: Array<IFormField>) => {
    const formInvalidFields = allFields.filter((field: IFormField) => {
      if (!field.value || (field.errors && field.errors.length > 0)) {
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
        <Typography.Title>Sign In</Typography.Title>

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

        <p><Link to={AppRoutesEnum.RESET_PASSWORD}>Forgot Password?</Link></p>

        <p>Or <Link to={AppRoutesEnum.SIGN_UP}>Sign Up</Link> if you don't have an account yet.</p>

        {this.props.authenticationError &&
          <ErrorModal
            isVisible={this.state.isErrorModalVisible}
            message={this.props.authenticationError}
            onCloseModal={this.handleCloseErrorModal}
            modalTitle="Sign in error"
          />
        }
      </div>
    );
  }
}

const WrappedComponent = connector(withFirebase(SignIn));

export {WrappedComponent as SignIn};

