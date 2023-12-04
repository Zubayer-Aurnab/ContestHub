import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Divider from "../../../component/Divider/Divider";
import Title from "../../../component/Title/Title";
import useAuth from "../../../Hooks/useAuth";
import { CircularProgress } from "@mui/material";
import NoData from "../../../component/NoData/NoData";


const MyWinning = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: winningData = [], isPending } = useQuery({
        queryKey: [user?.email, "winning-contest"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-winning/${user?.email}`)
            return (res.data)
        }
    })
    console.log(winningData)
    return (
        <div>
            <Title>My Winning</Title>
            <Divider text={"winning"} />
            {
                winningData?.length === 0 ?
                    <div>
                        <NoData text={'Hey there! Haven"t scored a win yet? No problem, every champ starts somewhere Seize your chance by registering for contests now'} />
                    </div>
                    :
                    <div>
                        {
                            isPending ?
                                <div className="text-center mt-36">
                                    <CircularProgress color="secondary" />
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
                                                    <th>winning</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* row  */}
                                                {
                                                    winningData.map((user, i) => <tr key={i}>
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
                                                            <p className="italic font-bold">{user.prize} $</p>
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
        </div>
    );
};

export default MyWinning;