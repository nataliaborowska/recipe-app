import React from 'react';
import {connect} from 'react-redux';
import {Typography} from 'antd';

import {ErrorModal} from '../../common/ErrorModal';
import {RemindPasswordForm} from './RemindPasswordForm';
import {withFirebase} from '../../components/Firebase';
import {remindPassword} from '../../store/actions/auth';

import modules from './RemindPassword.module.scss';

interface IPropTypes {
  authenticationError?: string;
  firebase: any;
  remindPassword: (email: string, firebase: any) => any;
}

interface IState {
  isErrorModalVisible: boolean;
  isFormValid: boolean;
  remindPasswordError: boolean;
}

class RemindPassword extends React.Component<IPropTypes, IState> {
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
    this.props.remindPassword(values.email, this.props.firebase);
  }

  handleFormSubmitFailed = () => {
    this.setState({remindPasswordError: true});
  }

  render() {
    return (
      <div className={modules.remindPassword}>
        <Typography>Remind password</Typography>

        <RemindPasswordForm
          isFormValid={this.state.isFormValid}
          onFormFieldsChange={this.handleFormFieldsChanged}
          onFormSubmit={this.handleFormSubmit}
          onFormSubmitFailed={this.handleFormSubmitFailed}
        />

        {this.props.authenticationError &&
          <ErrorModal
            errorMessage={this.props.authenticationError}
            isVisible={this.state.isErrorModalVisible}
            onCloseErrorModal={this.handleCloseErrorModal}
            modalTitle="Remind password fail"
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

const WrappedComponent = connect(mapStateToProps, {remindPassword})(withFirebase(RemindPassword));

export {WrappedComponent as RemindPassword};

