import { useQuery } from "@tanstack/react-query";
import Divider from "../../../component/Divider/Divider";
import Title from "../../../component/Title/Title";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import ParticipantsDropdown from "../../../component/ParticipantsDropdown/ParticipantsDropdown";
import { CircularProgress } from "@mui/material";
import NoData from "../../../component/NoData/NoData";


const ContestSubmitted = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: AllContest = [], refetch, isPending } = useQuery({
        queryKey: ['my-created-contest', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contest/${user?.email}`)
            return res.data
        }
    })
    return (
        <div>
            <Title>Contest Submitted</Title>
            <Divider text={"submissions"} />
            {
                AllContest.length === 0 ?
                    <div>
                        <NoData text={"Oops! It looks like you haven't created a contest yet. Ready to spark some excitement? Create a contest now and let the magic begin!"} />
                    </div>
                    :
                    <div>
                        {
                            isPending ?
                                <div className="text-center mt-36 h-screen">
                                    <CircularProgress color="secondary" />
                                </div>
                                :
                                <div className="overflow-y-scroll   md:h-[70vh] h-[80vh]">
                                    {
                                        AllContest.map((con, i) => <>
                                            <div key={i} className=" flex space-x-4  p-2 md:p-5 justify-evenly ">
                                                <img src={con.img} className="w-20 h-20 lg:w-32 lg:h-32 object-cover rounded-2xl" alt="" />
                                                <div >
                                                    <h1>{con.name}</h1>
                                                    <p><span className="p-1 bg-primary2 rounded-full text-white"><small>{con.tag}</small></span></p>
                                                </div>
                                                <div className="space-y-4 text-[12px] lg:text-sm">
                                                    <p className="">Enroll : <span className=" p-1 bg-blue-300 rounded-full px-2">{con.price}$</span></p>
                                                    <p>Winning Prize : <span className="p-1 bg-green-300 rounded-full px-2">{con.prize}$</span></p>

                                                </div>
                                                <div>
                                                    <h1>Participants</h1>
                                                    <div className="z-40">
                                                        <ParticipantsDropdown data={con} refetch={refetch} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="divider"></div>
                                        </>)
                                    }
                                </div>
                        }
                    </div>
            }
        </div>
    );
};

export default ContestSubmitted;