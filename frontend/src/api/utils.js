import axios from 'axios';
import join from 'url-join';


const apiPath = path => join('/api', path);

export const get = (path, params) => axios.get(apiPath(path), { params }).then(response => response.data);
