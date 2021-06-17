import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

export default function UserModal({ visible, closeHandler, record }) {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(record);
  }, [form, record, visible]);
  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={closeHandler}
        onCancel={closeHandler}
        forceRender
      >
        <Form name="basic" form={form}>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Create_Time" name="create_time">
            <Input />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
