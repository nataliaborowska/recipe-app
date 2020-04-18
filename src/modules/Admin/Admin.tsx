import React from 'react';

import {withAuthorization} from '../../common/withAuthorization';

import modules from './Admin.module.scss';

const Admin: React.FC = () => (
  <span>admin page</span>
);

const WrappedComponent = withAuthorization(Admin);

export {WrappedComponent as Admin};
