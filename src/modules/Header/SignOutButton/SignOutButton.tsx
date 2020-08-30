import React from 'react';
import {Button} from 'antd';

import {AppThunk} from '../../../store/store';
import {IFirebase, withFirebase} from '../../../components/Firebase';

interface IPropTypes {
  firebase: IFirebase;
  isAuthenticated: boolean;
  signOut: (firebase: IFirebase) => AppThunk<void>;
}

export const SignOutButtonUnwrapped: React.FC<IPropTypes> = (props) => {
  return (
    <Button
      data-test="component-sign-out-button"
      onClick={() => {
        props.signOut(props.firebase)
      }}>
      SIGN OUT
    </Button>
  );
}

const WrappedComponent = withFirebase(SignOutButtonUnwrapped);

export {WrappedComponent as SignOutButton};