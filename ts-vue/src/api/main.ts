import request from '@/utils/request';

export function get(params: any) {
  return request({
    url: '/api/getSomethings',
  });
}

export function post(params: any) {
  return request({
    url: '/api/postSomethings',
    method: 'POST',
    data: params,
  });
}
