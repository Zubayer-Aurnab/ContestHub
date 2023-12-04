import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://assigment-12-server-eta.vercel.app'
})
const useAxiosPublic = () => {
    return (axiosPublic);
};

export default useAxiosPublic;