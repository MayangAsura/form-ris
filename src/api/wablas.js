import axios from "axios";

export default axios.create({
    baseURL: 'https://wablas.com/api/v2'
})