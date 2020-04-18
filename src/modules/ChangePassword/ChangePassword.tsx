import React from 'react';
import {connect} from 'react-redux';
import {Typography} from 'antd';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import {AppRoutesEnum} from '../../utils/AppRoutesEnum';
import {ErrorModal} from '../../common/ErrorModal';
import {SuccessModal} from '../../common/SuccessModal';
import {ChangePasswordForm} from './ChangePasswordForm';
import {withFirebase} from '../../components/Firebase';
import {changePassword, changePasswordEnd, changePasswordFail} from '../../store/actions/auth';

import modules from './ChangePassword.module.scss';

interface IPropTypes extends RouteComponentProps {
  authenticatedUser?: any;
  authenticationError?: string;
  firebase: any;
  changePassword: (passwordNew: string, firebase: any) => any;
  changePasswordEnd: () => void;
  changePasswordFail: (error: string) => void;
  changePasswordSuccess: boolean;
}

interface IState {
  isFormValid: boolean;
}

class ChangePassword extends React.Component<IPropTypes, IState> {
  state = {
    isErrorModalVisible: false,
    isFormValid: false,
  }

  handleCloseErrorModal = () => {
    this.props.changePasswordEnd();
  }

  handleCloseSuccessModal = () => {
    this.props.changePasswordEnd();
    this.props.history.push(`${AppRoutesEnum.ACCOUNT}/${this.props.authenticatedUser.uid}`);
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
    this.props.changePassword(values.passwordNew, this.props.firebase);
  }

  handleFormSubmitFailed = () => {
    this.props.changePasswordFail('There was a problem submitting the form');
  }

  render() {
    return (
      <div className={modules.resetPassword}>
        <Typography>Reset password</Typography>

        <ChangePasswordForm
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
            modalTitle="Change password fail"
          />
        }

        <SuccessModal
          isVisible={this.props.changePasswordSuccess}
          message='Password change successful'
          onCloseModal={this.handleCloseSuccessModal}
          modalTitle="Change password success"
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    authenticatedUser: state.auth.authenticatedUser,
    authenticationError: state.auth.authError,
    changePasswordSuccess: state.auth.changePasswordSuccess,
  }
}

const WrappedComponent = connect(mapStateToProps, {changePassword, changePasswordEnd, changePasswordFail})(withRouter(withFirebase(ChangePassword)));

export {WrappedComponent as ChangePassword};

