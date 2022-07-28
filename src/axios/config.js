import axios from 'axios';

export const TOKEN_CYBERSOFT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJKYXZhIDE3IiwiSGV0SGFuU3RyaW5nIjoiMTkvMTIvMjAyMiIsIkhldEhhblRpbWUiOiIxNjcxNDA4MDAwMDAwIiwibmJmIjoxNjQ4NjU5NjAwLCJleHAiOjE2NzE1NTU2MDB9.OhFEeK7ExgP3U24hEq7GxmL5VzAjzaEPPeOZpaWzZGE';
export const DOMAIN = 'https://elearningnew.cybersoft.edu.vn/api';
export const USER_LOGIN = 'userLogin';
export const ACCESSTOKEN = 'accessToken';
export const USERINFO = 'userInfo';
export const maNhom = 'GP08';
export const COURSE = 'course';
const userData =
  JSON.parse(JSON.stringify(localStorage.getItem(ACCESSTOKEN))) || {};

//setup axios interceptor
export const http = axios.create({
  baseURL: DOMAIN, //Domain khi request api sẽ được ghép vào với link
  timeout: 30000, //Thời gian tối đa chờ response trả về
});

http.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers, //Lấy lại tất cả các giá trị header qua thuộc tính headers
      Authorization:
        'Bearer ' +
        JSON.parse(JSON.stringify(localStorage.getItem(ACCESSTOKEN))),
      TokenCybersoft: TOKEN_CYBERSOFT,
      'Content-type': 'application/json',
    };

    return config;
  },
  (errors) => {
    return Promise.reject({ errors });
  }
);
