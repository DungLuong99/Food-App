import axiosClient from "./axiosClient";
import axios from "axios";

const productApi = {
    getAll: (params) => {
        const url = '/products';
        return axiosClient.get(url, { params });
    },
    postImage: (params) => {
        const url = 'https://api.cloudinary.com/v1_1/dqqkocsxg/upload';
        return axios.post(url, params);
    },
    deleteImage: (params) => {
        const url = 'https://api.cloudinary.com/v1_1/dqqkocsxg/destroy';
        return axios.post(url, params);
    },
    postProduct: (params) => {
        const url = '/products';
        return axiosClient.post(url, params);
    },
    deleteProduct: (id) => {
        const url = '/products';
        return axiosClient.delete(`${url}/${id}`);
    },
    putProduct: (id, params) => {
        const url = '/products';
        return axiosClient.put(`${url}/${id}`, params);
    },
}
export default productApi;