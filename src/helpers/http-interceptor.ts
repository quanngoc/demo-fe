import axios from 'axios';

export default function setup() {
    const storedUser = localStorage.getItem('user');
    if (storedUser == null ) return;

    let user = JSON.parse(storedUser ? storedUser : "");

    axios.interceptors.request.use(function(config) {
        const token = user.accessToken;
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, function(err) {
        return Promise.reject(err);
    });
}
