import axios from 'axios'
// Add a request interceptor
//请求拦截器 发起请求前对请求参数拦截处理
axios.interceptors.request.use(function(config) {
    // Do something before request is sent
    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
// 响应拦截器
axios.interceptors.response.use(function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default axios