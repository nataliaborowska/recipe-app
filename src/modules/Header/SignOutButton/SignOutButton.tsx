import React from 'react';
import {Button} from 'antd';

import {AppThunk} from '../../../store/store';
import {IFirebase, withFirebase} from '../../../components/Firebase';

interface IPropTypes {
  firebase: IFirebase;
  isAuthenticated: boolean;
  signOut: (firebase: IFirebase) => AppThunk;
}

const SignOutButton: React.FC<IPropTypes> = (props) => {
  const signOut = () => {
    props.signOut(props.firebase);
  }

  return <Button onClick={signOut}>SIGN OUT</Button>
}

const WrappedComponent = withFirebase(SignOutButton);

export {WrappedComponent as SignOutButton};