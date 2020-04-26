import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Dropdown, Menu} from 'antd';
import {connect, ConnectedProps} from 'react-redux';
import {UserOutlined} from '@ant-design/icons';

import Logo from './logo.svg';
import {signOut} from '../../store/actions/auth';
import {AppRoutesEnum} from '../../utils/AppRoutesEnum';
import {SignOutButton} from './SignOutButton';

import modules from './Header.module.scss';

interface IRootStore {
  auth: {
    authenticatedUser: null | firebase.auth.UserCredential;
    isAuthenticated: boolean;
  }
}

const mapStateToProps = (state: IRootStore) => {
  return {
    authenticatedUser: state.auth.authenticatedUser,
    isAuthenticated: state.auth.isAuthenticated,
  }
};

const mapDispatchToProps = {signOut};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IPropTypes extends PropsFromRedux {}

class Header extends React.Component<IPropTypes> {
  onMenuButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }

  get menu() {
    return (
      <Menu>
        <Menu.Item key="1"><Link to={AppRoutesEnum.RECIPES_LIST}>Recipes</Link></Menu.Item>

        <Menu.Item key="2"><Link to={AppRoutesEnum.ADMIN}>Admin</Link></Menu.Item>

        {(this.props.authenticatedUser && this.props.authenticatedUser.user) &&
          <Menu.Item key="3">
            {this.props.authenticatedUser.user.uid}
            <Link to={`${AppRoutesEnum.ACCOUNT}/${this.props.authenticatedUser.user.uid}`}>Account</Link>
          </Menu.Item>
        }

        <Menu.Item key="4">
          <SignOutButton isAuthenticated={this.props.isAuthenticated} signOut={this.props.signOut} />
        </Menu.Item>
      </Menu>
    );
  }

  render() {
    return (
      <div className={modules.header}>
        <Link className={modules.logo} to="/">
          <img alt="recipe-app" className={modules.logoImage} src={Logo} />

          Recipes App
        </Link>

        {this.props.isAuthenticated ?
          <Dropdown overlay={this.menu} trigger={['click']}>
            <Button
              shape="circle"
              icon={<UserOutlined />}
              onClick={this.onMenuButtonClick}
            />
          </Dropdown>
          :
          <Link to={AppRoutesEnum.SIGN_IN}>SIGN IN</Link>
        }
      </div>
    );
  }
}

const WrappedComponent = connector(Header);

export {WrappedComponent as Header}
