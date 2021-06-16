import React from 'react';
import { Modal, Button } from 'antd';

export default function UserModal(props) {
  return (
    <div>
      <Modal title="Basic Modal" visible={props.visible}></Modal>
    </div>
  );
}
