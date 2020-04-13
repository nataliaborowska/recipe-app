import React from 'react';
import {Link} from 'react-router-dom';
import {Typography} from 'antd';

import {AppRoutesEnum} from '../../utils/AppRoutesEnum';

import modules from './Account.module.scss';

export const Account: React.FC = () => (
  <div className={modules.account}>
    <Typography>My account</Typography>

    <Link to={AppRoutesEnum.CHANGE_PASSWORD}>Change password</Link>
  </div>
);
