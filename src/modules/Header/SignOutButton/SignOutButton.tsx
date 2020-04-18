import React from 'react';
import {Button} from 'antd';

import {withFirebase} from '../../../components/Firebase';

interface IPropTypes {
  firebase: any;
  isAuthenticated: boolean;
  signOut: (frebase: any) => any;
}

const SignOutButton: React.FC<IPropTypes> = (props) => {
  const signOut = () => {
    props.signOut(props.firebase);
  }

  return <Button onClick={signOut}>SIGN OUT</Button>
}

const WrappedComponent = withFirebase(SignOutButton);

export {WrappedComponent as SignOutButton};