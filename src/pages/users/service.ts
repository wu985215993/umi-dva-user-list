import request, { extend } from 'umi-request';
import { message } from 'antd';
import { FormValues } from './data';
const errorHandler = function(error: any) {
  if (error.response) {
    if (error.response.status > 400) {
      message.error(error.data.message ? error.data.message : error.data);
    }
    /* console.log(error.response.status); //code
    console.log(error.data); //响应的主体内容 */
  } else {
    // The request was made but no response was received or error occurs when setting up the request.
    // console.log(error.message);
    message.error('Network Error');
  }

  // throw error; // If throw. The error will continue to be thrown.

  // return {some: 'data'}; If return, return the value as a return. If you don't write it is equivalent to return undefined, you can judge whether the response has a value when processing the result.
  // return {some: 'data'};
};

const extendRequest = extend({ errorHandler });

export const getRemoteList = async () => {
  return extendRequest('http://public-api-v1.aspirantzhang.com/users', {
    method: 'get',
  })
    .then(response => response)
    .catch(error => {
      return false;
    });
};
export const editRecord = async ({ id, values }: { id: number; values: FormValues }) => {
  return extendRequest(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'put',
    data: values,
  })
    .then(response => {
      return true;
    })
    .catch(error => {
      return false;
    });
};
export const deleteRecored = async ({ id }: { id: number }) => {
  return extendRequest(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'delete',
  })
    .then(response => {
      return true;
    })
    .catch(error => {
      return false;
    });
};
export const addRecored = async ({ values }: { values: FormValues }) => {
  return extendRequest(`http://public-api-v1.aspirantzhang.com/users/`, {
    method: 'post',
    data: values,
  })
    .then(response => {
      return true;
    })
    .catch(error => {
      return false;
    });
};
