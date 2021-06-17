import React, { useState } from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import UserModal from './components/UserModal.tsx';
function index({ users, dispatch }) {
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
          <a>Delete</a>
        </span>
      ),
    },
  ];
  const editHandler = record => {
    setMoalVisible(true);
    setRecord(record);
  };
  const closeHandler = () => {
    setMoalVisible(false);
  };
  const onFinish = values => {
    const id = record.id;
    dispatch({
      type: 'users/edit',
      payload: { id, values },
    });
  };
  return (
    <div className={'list-table'}>
      <Table columns={columns} dataSource={users.data} rowKey="id" />
      <UserModal
        visible={modalVisible}
        closeHandler={closeHandler}
        record={record}
        onFinish={onFinish}
      />
    </div>
  );
}
const mapStateToProps = ({ users }) => {
  return {
    users,
  };
};
export default connect(mapStateToProps)(index);
