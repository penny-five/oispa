import axios from 'axios';
import join from 'url-join';


const apiPath = path => join(process.env.API_URL, path);

export const get = path => () => axios.get(apiPath(path)).then(response => response.data);
