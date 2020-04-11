import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Dropdown, Menu} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';

import Logo from './logo.svg';
import {signIn, SignInAction, signOut, SignOutAction} from '../../store/actions/auth';
import {AppRoutesEnum} from '../../utils/AppRoutesEnum';
import modules from './Header.module.scss';

interface IPropTypes {
  signIn: () => SignInAction;
  signOut: () => SignOutAction;
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

        <Menu.Item key="3"><Link to={AppRoutesEnum.REMIND_PASSWORD}>Forgot Password</Link></Menu.Item>

        <Menu.Item key="4"><Link to={AppRoutesEnum.SIGN_IN}></Link>Sign In</Menu.Item>

        <Menu.Item key="5"><Link to={AppRoutesEnum.SIGN_UP}>Sign Up</Link></Menu.Item>

        <Menu.Item key="6"><Link to={AppRoutesEnum.ACCOUNT}>Account</Link></Menu.Item>

        <Menu.Item key="7"><Button onClick={this.props.signOut}>SIGN OUT</Button></Menu.Item>
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
          <Button onClick={this.props.signIn}>SIGN IN</Button>
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

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     logIn: () => dispatch(

//),
//     logout: () => dispatch(logOut),
//   }
// }

const WrappedComponent = connect(mapStateToProps, {signIn, signOut})(Header);

export {WrappedComponent as Header}
