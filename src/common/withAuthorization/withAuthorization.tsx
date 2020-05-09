import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import {AppRoutesEnum} from '../../utils/AppRoutesEnum';
import {IFirebase, withFirebase} from '../../components/Firebase';
import {IStoreState} from '../../store/store';

const mapStateToProps = (state: IStoreState) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IPropTypes extends RouteComponentProps, PropsFromRedux {
  firebase: IFirebase;
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
        console.warn('is this valid', authUser);

        if (authUser === null) {
          this.props.history.push(AppRoutesEnum.SIGN_IN);
        } else {

        }
      });
    }

    render() {
      return this.props.isAuthenticated ? <Component {...this.props} /> : null;
    }
  }

  return connector(withRouter(withFirebase(WithAuthorization)));
}