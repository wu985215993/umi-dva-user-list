import React, { useState, FC, useRef } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import ProTable, { ProColumns, TableDropdown } from '@ant-design/pro-table';
import { Dispatch, connect } from 'dva';
import UserModal from './components/UserModal';
import { UserState } from './model';
import { SingleUserType, FormValues } from './data';
import { getRemoteList } from './service';
interface ActionType {
  reload: (resetPageIndex?: boolean) => void;
  reloadAndRest: () => void;
  reset: () => void;
}

interface UserPageProps {
  users: UserState;
  dispatch: Dispatch;
  userListLoading: Boolean;
}
const UserListPage: FC<UserPageProps> = ({ users, dispatch, userListLoading }) => {
  const [modalVisible, setMoalVisible] = useState(false);
  const [record, setRecord] = useState<SingleUserType | undefined>(undefined);
  const ref = useRef<ActionType>();
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Create_time',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: SingleUserType) => (
        <span>
          <a onClick={() => editHandler(record)}>Edit</a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Popconfirm
            title="Are you sure delete this user?"
            onConfirm={() => {
              deleteHandler(record.id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <a>Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];
  const editHandler = (record: SingleUserType) => {
    setMoalVisible(true);
    setRecord(record);
  };
  const deleteHandler = (id: number) => {
    dispatch({
      type: 'users/delete',
      payload: {
        id,
      },
    });
  };
  const closeHandler = () => {
    setMoalVisible(false);
  };
  const onFinish = (values: FormValues) => {
    let id = 0;
    if (record) {
      id = record.id;
      dispatch({
        type: 'users/edit',
        payload: { id, values },
      });
      setMoalVisible(false);
    } else {
      dispatch({
        type: 'users/add',
        payload: { values },
      });
      setMoalVisible(false);
    }
  };
  const addHandler = () => {
    setMoalVisible(true);
    setRecord(undefined);
  };
  const requestHandler = async ({ pageSize, current }) => {
    //现在这个方法执行是在reducer之后了 教程中存在问题 我没遇到 解决办法在这里获取一下数据使用getRemostList
    const users = await getRemoteList({
      page: current,
      per_page: pageSize,
    });
    return {
      data: users.data,
      success: true,
      total: users.meta.total,
    };
  };
  const reloadHandler = () => {
    ref.current.reload();
  };
  return (
    <div className={'list-table'}>
      <Button type="primary" onClick={addHandler}>
        Add
      </Button>
      <Button onClick={reloadHandler}>Reload</Button>
      <ProTable
        columns={columns}
        // dataSource={users.data}
        rowKey="id"
        loading={userListLoading}
        request={requestHandler}
        search={false}
        actionRef={ref}
      />
      <UserModal
        visible={modalVisible}
        closeHandler={closeHandler}
        record={record}
        onFinish={onFinish}
      />
    </div>
  );
};
const mapStateToProps = ({ users, loading }: { users: UserState; loading: Loading }) => {
  return {
    users,
    userListLoading: loading.models.users,
  };
};
export default connect(mapStateToProps)(UserListPage);
