import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Dropdown, Menu} from 'antd';
import {connect, ConnectedProps} from 'react-redux';
import {UserOutlined} from '@ant-design/icons';

import Logo from './logo.svg';
import {signOut} from '../../store/actions/authActions/auth';
import {AppRoutesEnum} from '../../utils/AppRoutesEnum';
import {SignOutButton} from './SignOutButton';
import {IStoreState} from '../../store/store';

import modules from './Header.module.scss';

const mapStateToProps = (state: IStoreState) => {
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

        <Menu.Item key="2"><Link to={AppRoutesEnum.CREATE_RECIPE}>Create Recipe</Link></Menu.Item>

        <Menu.Item key="3"><Link to={AppRoutesEnum.ADMIN}>Admin</Link></Menu.Item>

        {this.props.authenticatedUser &&
          <Menu.Item key="4">
            <Link to={`${AppRoutesEnum.ACCOUNT}/${this.props.authenticatedUser.uid}`}>Account</Link>
          </Menu.Item>
        }

        <Menu.Item key="5">
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
