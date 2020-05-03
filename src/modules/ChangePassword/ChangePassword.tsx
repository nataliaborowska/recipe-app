import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {Typography} from 'antd';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import {AppRoutesEnum} from '../../utils/AppRoutesEnum';
import {ErrorModal} from '../../common/ErrorModal';
import {IFirebase} from '../../components/Firebase';
import {SuccessModal} from '../../common/SuccessModal';
import {ChangePasswordForm} from './ChangePasswordForm';
import {withFirebase} from '../../components/Firebase';
import {changePassword, changePasswordEnd, changePasswordFail} from '../../store/actions/authActions/auth';
import {IStoreState} from '../../store/store';

import modules from './ChangePassword.module.scss';

export interface IFormField {
  errors?: Array<string>;
  name?: string | number | (string | number)[];
  touched?: boolean;
  validating?: boolean;
  value?: string;
}

const mapStateToProps = (state: IStoreState) => {
  return {
    authenticatedUser: state.auth.authenticatedUser,
    authenticationError: state.auth.authError,
    changePasswordSuccess: state.auth.changePasswordSuccess,
  }
}

const mapDispatchToProps = {changePassword, changePasswordEnd, changePasswordFail};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IPropTypes extends PropsFromRedux, RouteComponentProps {
  firebase: IFirebase;
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
    if (this.props.authenticatedUser && this.props.authenticatedUser.user) {
      this.props.history.push(`${AppRoutesEnum.ACCOUNT}/${this.props.authenticatedUser.user.uid}`);
    }
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
    this.props.changePassword(values.passwordNew, this.props.firebase);
  }

  handleFormSubmitFailed = () => {
    this.props.changePasswordFail('There was a problem submitting the form');
  }

  render() {
    return (
      <div className={modules.resetPassword}>
        <Typography.Title>Reset password</Typography.Title>

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

const WrappedComponent = connector(withRouter(withFirebase(ChangePassword)));

export {WrappedComponent as ChangePassword};

