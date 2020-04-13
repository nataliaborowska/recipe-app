import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Dropdown, Menu} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';

import Logo from './logo.svg';
import {signOut} from '../../store/actions/auth';
import {AppRoutesEnum} from '../../utils/AppRoutesEnum';
import {SignOutButton} from './SignOutButton';

import modules from './Header.module.scss';

interface IPropTypes {
  signOut: (firebase: any) => any;
  isAuthenticated: boolean;
}

class Header extends React.Component<IPropTypes> {
  onMenuButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }

  get menu() {
    return (
      <Menu>
        <Menu.Item key="1"><Link to={AppRoutesEnum.RECIPES_LIST}>Recipes</Link></Menu.Item>

        <Menu.Item key="2"><Link to={AppRoutesEnum.ADMIN}>Admin</Link></Menu.Item>

        <Menu.Item key="3"><Link to={AppRoutesEnum.ACCOUNT}>Account</Link></Menu.Item>

        <Menu.Item key="4"><SignOutButton signOut={this.props.signOut} /></Menu.Item>
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

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
};

const WrappedComponent = connect(mapStateToProps, {signOut})(Header);

export {WrappedComponent as Header}
