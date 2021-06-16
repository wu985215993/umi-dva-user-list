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
