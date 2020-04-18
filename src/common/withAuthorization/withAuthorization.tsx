import React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';

// import {}
import {AppRoutesEnum} from '../../utils/AppRoutesEnum';
import {withFirebase} from '../../components/Firebase';

interface IPropTypes extends RouteComponentProps {
  firebase: any;
  isAuthenticated: boolean;
}

export const withAuthorization = (Component: any) => {
  class WithAuthorization extends React.Component<IPropTypes> {
    firebaseListener?: () => void;

    componentDidMount() {
      this.checkIfUserAuthenticated();
    }

    componentDidUpdate() {
      if (!this.props.isAuthenticated) {
        this.checkIfUserAuthenticated();
      }
    }

    componentWillUnmount() {
      if (this.firebaseListener) {
        this.firebaseListener();
      }
    }

    checkIfUserAuthenticated() {
      this.firebaseListener = this.props.firebase.auth.onAuthStateChanged((authUser: any) => {
        if (authUser === null) {
          this.props.history.push(AppRoutesEnum.SIGN_IN);
        }
      });
    }

    render() {
      return this.props.isAuthenticated ? <Component {...this.props} /> : null;
    }
  }

  const mapStateToProps = (state: any) => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
    }
  }

  return connect(mapStateToProps)(withRouter(withFirebase(WithAuthorization)));
}