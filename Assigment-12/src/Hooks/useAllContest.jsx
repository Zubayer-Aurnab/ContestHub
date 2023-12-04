import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useAllContest = () => {
    const axiosSecure = useAxiosSecure();
    const { isPending: contestDataLoading, data: AllContest = [], refetch } = useQuery({
        queryKey: ["allContest"],
        queryFn: async () => {
            const res = await axiosSecure.get("/contest")
            return res.data
        }
    })
    return [AllContest, contestDataLoading ,refetch];
};

export default useAllContest;