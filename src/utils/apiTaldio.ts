import axios from 'axios';
import localUser from './localUser';

const apiTaldio = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_TALDIO_BASE_URL,
});

// Add a request interceptor
apiTaldio.interceptors.request.use(function (config) {
    const token = localUser.getToken();

    if ((token ?? '').length > 0) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});

apiTaldio.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    const isRequestVerifyToken = /api\/token/.test(error?.request?.responseURL);
    if (!isRequestVerifyToken && error?.response?.status === 401) {
        localUser.remove();
        window.location.href = '/';
        throw new Error('failed authentication');
    }

    return Promise.reject(error);
});

export default apiTaldio;