import React, { useEffect, FC } from 'react';
import { Modal, Form, Input } from 'antd';
import { SingleUserType, FormValues } from '../data';

interface UserModalProps {
  visible: boolean;
  closeHandler: () => void;
  record: SingleUserType | undefined;
  onFinish: (values: FormValues) => void;
}

const UserModal: FC<UserModalProps> = ({
  visible,
  closeHandler,
  record,
  onFinish,
  confirmLoading,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (record === undefined) {
      form.resetFields();
    } else {
      form.setFieldsValue(record);
    }
  }, [form, record, visible]);

  const onOk = () => {
    form.submit();
  };

  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={onOk}
        onCancel={closeHandler}
        forceRender
        confirmLoading={confirmLoading}
      >
        <Form name="basic" form={form} onFinish={onFinish}>
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
};
export default UserModal;
