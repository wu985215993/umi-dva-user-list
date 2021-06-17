import request from 'umi-request';
import { message } from 'antd';
export const getRemoteList = async () => {
  return request('http://public-api-v1.aspirantzhang.com/users', {
    method: 'get',
  })
    .then(response => response)
    .catch(error => {
      console.log(error);
    });
};
export const editRecord = async ({ id, values }) => {
  return request(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'put',
    data: values,
  })
    .then(response => {
      message.success('Edit successfully');
      return response;
    })
    .catch(error => {
      message.error('Edit Failed');
    });
};
export const deleteRecored = async ({ id }) => {
  return request(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'delete',
  })
    .then(response => {
      message.success('Delete successfully');
      return response;
    })
    .catch(error => {
      message.error('Delete Failed');
    });
};
export const addRecored = async ({ values }) => {
  return request(`http://public-api-v1.aspirantzhang.com/users/`, {
    method: 'post',
    data: values,
  })
    .then(response => {
      message.success('Add successfully');
      return response;
    })
    .catch(error => {
      message.error('Add Failed');
    });
};
