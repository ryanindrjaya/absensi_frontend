import axios from 'axios';
import localUser from './localUser';

const apiabsensi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_absensi_BASE_URL,
});

// Add a request interceptor
apiabsensi.interceptors.request.use(function (config) {
    const token = localUser.getToken();

    if ((token ?? '').length > 0) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});

apiabsensi.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    const isRequestVerifyToken = /api\/token/.test(error?.request?.responseURL);
    if (!isRequestVerifyToken && error?.response?.status === 401) {
        localUser.remove();
        // setTimeout(() => {
        //     window.location.href = '/admin';
        // }, 1000)
        throw new Error('failed authentication');
    }

    return Promise.reject(error);
});

export default apiabsensi;