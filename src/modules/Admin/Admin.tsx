import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {List, Spin, Typography} from 'antd';

import {fetchUsersList, removeUsersList} from '../../store/actions/auth';
import {IFirebase} from '../../components/Firebase';
import {IUser} from '../../store/reducers/authReducer';
import {withAuthorization} from '../../common/withAuthorization';
import {withFirebase} from '../../components/Firebase';

import modules from './Admin.module.scss';

interface IRootState {
  auth: {
    fetchingUsers: boolean;
    users: Array<IUser>;
  };
}

const mapStateToProps = (state: IRootState) => {
  return {
    fetchingUsers: state.auth.fetchingUsers,
    users: state.auth.users,
  }
}

const mapDispatchToProps = {fetchUsersList, removeUsersList};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IPropTypes extends PropsFromRedux {
  firebase: IFirebase;
}

class Admin extends React.Component<IPropTypes> {
  componentDidMount() {
    this.props.fetchUsersList(this.props.firebase);
  }

  componentWillUnmount() {
    this.props.removeUsersList(this.props.firebase);
  }

  render() {
    return (
      <div className={modules.admin}>
        <Typography.Title>Admin</Typography.Title>

        {this.props.fetchingUsers ?
          <Spin />
          :
          <React.Fragment>
            <Typography.Title level={2}>Users</Typography.Title>

            <List
              itemLayout="horizontal"
              dataSource={this.props.users}
              renderItem={user => (
                <List.Item>
                  <List.Item.Meta
                    title={<Typography.Paragraph>{user.email}</Typography.Paragraph>}
                    description={
                      <React.Fragment>
                        <Typography.Paragraph>Username: {user.username}</Typography.Paragraph>
                        <Typography.Paragraph>UserId: {user.userId}</Typography.Paragraph>
                      </React.Fragment>
                    }
                  />
                </List.Item>
              )}
            />
          </React.Fragment>
        }
      </div>
    );
  }
}

const WrappedComponent = connector(withAuthorization(withFirebase(Admin)));

export {WrappedComponent as Admin};
