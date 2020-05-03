import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Typography} from 'antd';

import {AppRoutesEnum} from '../../utils/AppRoutesEnum';
import {ErrorModal} from '../../common/ErrorModal';
import {IFirebase, withFirebase} from '../../components/Firebase';
import {ResetPasswordForm} from './ResetPasswordForm';
import {resetPassword, resetPasswordEnd, resetPasswordFail} from '../../store/actions/authActions/auth';
import {SuccessModal} from '../../common/SuccessModal';
import {IStoreState} from '../../store/store';

import modules from './ResetPassword.module.scss';

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
    resetPasswordSuccess: state.auth.resetPasswordSuccess,
  }
}

const mapDispatchToProps = {resetPassword, resetPasswordEnd, resetPasswordFail};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IPropTypes extends PropsFromRedux, RouteComponentProps {
  firebase: IFirebase;
}

interface IState {
  isFormValid: boolean;
}

class ResetPassword extends React.Component<IPropTypes, IState> {
  state = {
    isFormValid: false,
  }

  handleCloseErrorModal = () => {
    this.props.resetPasswordEnd();
  }

  handleCloseSuccessModal = () => {
    this.props.resetPasswordEnd();
    this.props.history.push(AppRoutesEnum.SIGN_IN);
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
    this.props.resetPassword(values.email, this.props.firebase);
  }

  handleFormSubmitFailed = () => {
    this.props.resetPasswordFail('There was a problem submitting the form');
  }

  render() {
    return (
      <div className={modules.resetPassword}>
        <Typography.Title>Reset password</Typography.Title>

        <ResetPasswordForm
          isFormValid={this.state.isFormValid}
          onFormFieldsChange={this.handleFormFieldsChanged}
          onFormSubmit={this.handleFormSubmit}
          onFormSubmitFailed={this.handleFormSubmitFailed}
        />

        {this.props.authenticationError &&
          <ErrorModal
            isVisible={this.props.authenticationError.length > 0}
            message={this.props.authenticationError}
            onCloseModal={this.handleCloseErrorModal}
            modalTitle="Reset password fail"
          />
        }

        <SuccessModal
          isVisible={this.props.resetPasswordSuccess}
          message='A link to reset the password has been sent to your email'
          onCloseModal={this.handleCloseSuccessModal}
          modalTitle="Reset password success"
        />
      </div>
    );
  }
}

const WrappedComponent = connector(withRouter(withFirebase(ResetPassword)));

export {WrappedComponent as ResetPassword};

