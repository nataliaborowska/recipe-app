import React from 'react';
import {connect} from 'react-redux';
import {Spin, Typography} from 'antd';
import {Redirect} from 'react-router-dom';

import {AppRoutesEnum} from '../../utils/AppRoutesEnum';
import {ErrorModal} from '../../common/ErrorModal';
import {SignUpForm} from './SignUpForm';
import {withFirebase} from '../../components/Firebase';
import {signUp} from '../../store/actions/auth';

import modules from './SignUp.module.scss';

interface IPropTypes {
  authenticationError?: string;
  authenticationIsLoading: boolean;
  firebase: any;
  isAuthenticated: boolean;
  signUp: (email: string, password: string, username: string, firebase: any) => any;
}

interface IState {
  isErrorModalVisible: boolean;
  isFormValid: boolean;
  signUpError: boolean;
}

class SignUp extends React.Component<IPropTypes, IState> {
  state = {
    isErrorModalVisible: false,
    isFormValid: false,
    signUpError: false,
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
    this.props.signUp(values.email, values.password, values.username, this.props.firebase);
  }

  handleFormSubmitFailed = () => {
    this.setState({signUpError: true});
  }

  render() {
    if (this.props.isAuthenticated) {
      return (<Redirect to={AppRoutesEnum.RECIPES_LIST} />);
    }

    return (
      <div className={modules.signUp}>
        <Typography>Sign Up</Typography>

        {this.props.authenticationIsLoading ?
          <Spin />
          :
          <SignUpForm
            isFormValid={this.state.isFormValid}
            onFormFieldsChange={this.handleFormFieldsChanged}
            onFormSubmit={this.handleFormSubmit}
            onFormSubmitFailed={this.handleFormSubmitFailed}
          />
        }

        {this.props.authenticationError &&
          <ErrorModal
            message={this.props.authenticationError}
            isVisible={this.state.isErrorModalVisible}
            modalTitle="Sign up error"
            onCloseModal={this.handleCloseErrorModal}
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

const WrappedComponent = connect(mapStateToProps, {signUp})(withFirebase(SignUp));

export {WrappedComponent as SignUp};

