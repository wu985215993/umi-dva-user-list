import React from 'react';
import { Modal, Button } from 'antd';

export default function UserModal(props) {
  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={props.visible}
        onOk={props.closeHandler}
        onCancel={props.closeHandler}
      >
        {JSON.stringify(props.record)}
      </Modal>
    </div>
  );
}
