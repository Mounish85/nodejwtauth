import axios from 'axios';
const api=axios.create({baseURL:'http://localhost:3000',withCredentials:true});
api.interceptors.request.use(c=>{const token=localStorage.getItem('jwt_token');if(token)c.headers.Authorization=`Bearer ${token}`;return c});
export const errorMessage=e=>!e.response?'Unable to reach the server. Check that the API is running.':Object.values(e.response.data?.errors||{}).filter(Boolean).join(' ')||e.response.data?.message||(e.response.status===401?'Your session has expired. Please log in again.':'Something went wrong.');
export default api;
