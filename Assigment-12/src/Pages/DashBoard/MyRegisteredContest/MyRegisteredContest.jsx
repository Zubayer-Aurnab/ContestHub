import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Divider from "../../../component/Divider/Divider";
import Title from "../../../component/Title/Title";
import useAuth from "../../../Hooks/useAuth";
import { CircularProgress } from "@mui/material";

import NoData from "../../../component/NoData/NoData";



const MyRegisteredContest = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    // console.log(user)
    const { isPending, data: myPayments = [] } = useQuery({
        queryKey: ["my-contest", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment/${user.email}`)
            return res.data
        },

    })

    console.log(myPayments, isPending)
    return (
        <div>
            <Title>My Registered Page</Title>
            <Divider text={"My Contest"} />
            {
                myPayments.length === 0 ?
                    <div>
                        <NoData  text={"Looks like you haven't registered for any contests yet. Don't miss out on the fun and exciting challenges! "} />
                    </div>
                    :
                    <div>
                        {
                            isPending ?
                                <div className="text-center mt-36">
                                    < CircularProgress color="secondary" />
                                </div>
                                :
                                <div className=" overflow-y-scroll md:h-[70vh] lg:h-[80vh]">
                                    <div className="overflow-x-scroll   md:overflow-x-hidden px-10">
                                        <table className="table overflow-y-scroll">
                                            {/* head */}
                                            <thead>
                                                <tr>
                                                    <th>
                                                        #
                                                    </th>

                                                    <th>Name&Photo</th>
                                                    <th>tag</th>
                                                    <th>Price</th>
                                                    <th>Date</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* row  */}
                                                {
                                                    myPayments.map((user, i) => <tr key={i}>
                                                        <th>
                                                            {i + 1}
                                                        </th>
                                                        <td>
                                                            <div className="flex items-center gap-3">
                                                                <div className="avatar">
                                                                    <div className="mask mask-squircle w-12 h-12">
                                                                        <img src={user.img} alt="Avatar Tailwind CSS Component" />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="font-bold">{user.name}</div>

                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="">
                                                            <p><span className="bg-primary2 p-1 px-2 rounded-full text-white">{user.tag}</span></p>
                                                        </td>
                                                        <td>
                                                            <p className="italic font-bold">{user.price} $</p>
                                                            <br />

                                                        </td>

                                                        <td>
                                                            <p>{user.date}</p>
                                                        </td>
                                                    </tr>)
                                                }

                                            </tbody>


                                        </table>
                                    </div>
                                </div>
                        }
                    </div>
            }
        </div >
    );
};

export default MyRegisteredContest;