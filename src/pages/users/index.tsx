import React, { useState } from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import UserModal from './components/UserModal.tsx';
function index({ users }) {
  const [modalVisible, setMoalVisible] = useState(false);
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
          <a onClick={visibleHandler}>Edit</a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <a>Delete</a>
        </span>
      ),
    },
  ];
  const visibleHandler = () => {
    setMoalVisible(true);
  };
  return (
    <div className={'list-table'}>
      <Table columns={columns} dataSource={users.data} />
      <UserModal visible={modalVisible} />
    </div>
  );
}
const mapStateToProps = ({ users }) => {
  return {
    users,
  };
};
export default connect(mapStateToProps)(index);
