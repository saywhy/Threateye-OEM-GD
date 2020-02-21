import axios from 'axios';

axios.defaults.baseURL = '';
axios.interceptors.response.use((resp) => {
  return resp.data;
});


export default axios;
