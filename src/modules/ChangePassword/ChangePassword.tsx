import React from 'react';
import {connect} from 'react-redux';
import {Typography} from 'antd';

import {ErrorModal} from '../../common/ErrorModal';
import {ChangePasswordForm} from './ChangePasswordForm';
import {withFirebase} from '../../components/Firebase';
import {changePassword} from '../../store/actions/auth';

import modules from './ChangePassword.module.scss';

interface IPropTypes {
  authenticationError?: string;
  firebase: any;
  changePassword: (passwordCurrent: string, passwordNew: string, firebase: any) => any;
}

interface IState {
  isErrorModalVisible: boolean;
  isFormValid: boolean;
  remindPasswordError: boolean;
}

class ChangePassword extends React.Component<IPropTypes, IState> {
  state = {
    isErrorModalVisible: false,
    isFormValid: false,
    remindPasswordError: false,
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
    console.warn(values);
    this.props.changePassword(values.passwordCurrent, values.passwordNew, this.props.firebase);
  }

  handleFormSubmitFailed = () => {
    this.setState({remindPasswordError: true});
  }

  render() {
    return (
      <div className={modules.remindPassword}>
        <Typography>Remind password</Typography>

        <ChangePasswordForm
          isFormValid={this.state.isFormValid}
          onFormFieldsChange={this.handleFormFieldsChanged}
          onFormSubmit={this.handleFormSubmit}
          onFormSubmitFailed={this.handleFormSubmitFailed}
        />

        {this.props.authenticationError &&
          <ErrorModal
            isVisible={this.state.isErrorModalVisible}
            errorMessage={this.props.authenticationError}
            onCloseErrorModal={this.handleCloseErrorModal}
            modalTitle="Change password fail"
          />
        }
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    authenticationError: state.auth.authError,
  }
}

const WrappedComponent = connect(mapStateToProps, {changePassword})(withFirebase(ChangePassword));

export {WrappedComponent as ChangePassword};

