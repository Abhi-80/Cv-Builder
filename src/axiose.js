import axios from 'axios';
import request from "./request"; // Assuming this file is in the same directory

const API_KEY = '3213be045c3699a7d5c4ce5de2b810cd';

axios.get(request.fetchTrending)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error fetching trending data:', error);
    });

export default axios;
