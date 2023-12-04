import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from '../Hooks/useAuth'

const useUserRole = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { refetch,isPending:isUserLoading,data: UserRole = [] } = useQuery({
        queryKey: [user?.email, "role"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`)
            // console.log(res.data)
            return res.data;
        }
    })
    return [UserRole,isUserLoading,refetch];
};

export default useUserRole;