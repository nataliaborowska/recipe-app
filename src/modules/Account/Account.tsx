import React from 'react';
import {Link} from 'react-router-dom';
import {Typography} from 'antd';

import {AppRoutesEnum} from '../../utils/AppRoutesEnum';
import {withAuthorization} from '../../common/withAuthorization';

import modules from './Account.module.scss';

export const AccountUnwrapped: React.FC = () => (
  <div
    className={modules.account}
    data-test='component-account'
  >
    <Typography.Title>My account</Typography.Title>

    <Link to={AppRoutesEnum.CHANGE_PASSWORD}>Change password</Link>
  </div>
);

const WrappedComponent = withAuthorization(AccountUnwrapped);

export {WrappedComponent as Account};
