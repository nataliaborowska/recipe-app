import React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Typography} from 'antd';

import {AppRoutesEnum} from '../../utils/AppRoutesEnum';
import {ErrorModal} from '../../common/ErrorModal';
import {SuccessModal} from '../../common/SuccessModal';
import {ResetPasswordForm} from './ResetPasswordForm';
import {withFirebase} from '../../components/Firebase';
import {resetPassword, resetPasswordEnd, resetPasswordFail, resetPasswordSuccess} from '../../store/actions/auth';

import modules from './ResetPassword.module.scss';

interface IPropTypes extends RouteComponentProps {
  authenticationError?: string;
  firebase: any;
  resetPassword: (email: string, firebase: any) => any;
  resetPasswordEnd: () => any;
  resetPasswordFail: (error: string) => void;
  resetPasswordSuccess: boolean;
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
    this.props.resetPassword(values.email, this.props.firebase);
  }

  handleFormSubmitFailed = () => {
    this.props.resetPasswordFail('There was a problem submitting the form');
  }

  render() {
    return (
      <div className={modules.resetPassword}>
        <Typography>Reset password</Typography>

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

const mapStateToProps = (state: any) => {
  return {
    authenticationError: state.auth.authError,
    resetPasswordSuccess: state.auth.resetPasswordSuccess,
  }
}

const WrappedComponent = connect(
  mapStateToProps, {resetPassword, resetPasswordEnd, resetPasswordFail}
)(withRouter(withFirebase(ResetPassword)));

export {WrappedComponent as ResetPassword};

