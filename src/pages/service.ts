import request from 'umi-request';

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
      console.log('OK');
      return response;
    })
    .catch(error => {
      console.log(error);
    });
};
