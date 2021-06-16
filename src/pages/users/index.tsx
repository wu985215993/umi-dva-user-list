import React from 'react';
import { Table, Tag } from 'antd';
import { connect } from 'react-redux';
function index({ users }) {
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
          <a>Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;
          <a>Delete</a>
        </span>
      ),
    },
  ];
  console.log(users.data);
  return (
    <div className={'list-table'}>
      <Table columns={columns} dataSource={users.data} />
    </div>
  );
}
const mapStateToProps = ({ users }) => {
  return {
    users,
  };
};
export default connect(mapStateToProps)(index);
