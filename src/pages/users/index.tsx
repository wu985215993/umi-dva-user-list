import React, { useState } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import UserModal from './components/UserModal.tsx';
function index({ users, dispatch, userListLoading }) {
  const [modalVisible, setMoalVisible] = useState(false);
  const [record, setRecord] = useState(undefined);
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
    },
    {
      title: 'Create_time',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
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
  const editHandler = record => {
    setMoalVisible(true);
    setRecord(record);
  };
  const deleteHandler = id => {
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
  const onFinish = values => {
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
  return (
    <div className={'list-table'}>
      <Button type="primary" onClick={addHandler}>
        Add
      </Button>
      <Table columns={columns} dataSource={users.data} rowKey="id" loading={userListLoading} />
      <UserModal
        visible={modalVisible}
        closeHandler={closeHandler}
        record={record}
        onFinish={onFinish}
      />
    </div>
  );
}
const mapStateToProps = ({ users, loading }) => {
  return {
    users,
    userListLoading: loading.models.users,
  };
};
export default connect(mapStateToProps)(index);
