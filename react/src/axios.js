import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://bloggeronly.herokuapp.com'
});
instance.defaults.headers.common['authorization'] = 'authorization';

export default instance;