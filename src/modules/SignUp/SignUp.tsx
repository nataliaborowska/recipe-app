import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {Spin, Typography} from 'antd';
import {Redirect} from 'react-router-dom';

import {AppRoutesEnum} from '../../utils/AppRoutesEnum';
import {ErrorModal} from '../../common/ErrorModal';
import {IFirebase, withFirebase} from '../../components/Firebase';
import {signUp} from '../../store/actions/authActions/auth';
import {SignUpForm} from './SignUpForm';
import {IStoreState} from '../../store/store';

import modules from './SignUp.module.scss';

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

const mapDispatchToProps = {signUp};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromredux = ConnectedProps<typeof connector>;

interface IPropTypes extends PropsFromredux {
  firebase: IFirebase;
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
    this.props.signUp(values.email, values.password, values.username, this.props.firebase);
  }

  handleFormSubmitFailed = () => {
    this.setState({signUpError: true});
  }

  render() {
    if (this.props.isAuthenticated) {
      return (<Redirect to={AppRoutesEnum.RECIPES} />);
    }

    return (
      <div className={modules.signUp}>
        <Typography.Title>Sign Up</Typography.Title>

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

const WrappedComponent = connector(withFirebase(SignUp));

export {WrappedComponent as SignUp};

