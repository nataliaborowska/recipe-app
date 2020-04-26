import React from 'react';
import {Link} from 'react-router-dom';
import {Typography} from 'antd';

import {AppRoutesEnum} from '../../utils/AppRoutesEnum';
import {withAuthorization} from '../../common/withAuthorization';

import modules from './Account.module.scss';

const Account: React.FC = () => (
  <div className={modules.account}>
    <Typography.Title>My account</Typography.Title>

    <Link to={AppRoutesEnum.CHANGE_PASSWORD}>Change password</Link>
  </div>
);

const WrappedComponent = withAuthorization(Account);

export {WrappedComponent as Account};
