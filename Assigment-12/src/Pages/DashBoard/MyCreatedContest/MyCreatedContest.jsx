import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Divider from "../../../component/Divider/Divider";
import Title from "../../../component/Title/Title";
import useAuth from "../../../Hooks/useAuth";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import NoData from "../../../component/NoData/NoData";


const MyCreatedContest = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data, refetch, isPending } = useQuery({
        queryKey: ['my-created-contest', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contest/${user?.email}`)
            return res.data
        }
    })
    console.log(data)
    const handelDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/delete-contest/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });
    }
    return (
        <div>
            <Title>My  Contest</Title>
            <Divider text={"Contest"} />
            {
                data?.length === 0 ?
                    <div>
                        <NoData text={"Oops! It looks like you haven't created a contest yet. Ready to spark some excitement? Create a contest now and let the magic begin!"} />
                    </div>
                    :
                    <div>
                        {
                            isPending ?
                                <div className="text-center mt-36">
                                    <CircularProgress color="secondary" />
                                </div>
                                :
                                <div className="overflow-y-scroll md:h-[70vh] lg:h-[80vh]">
                                    <div className="overflow-x-scroll   md:overflow-x-hidden px-5 md:px-10">
                                        <table className="table ">
                                            {/* head */}
                                            <thead>
                                                <tr>
                                                    <th>

                                                    </th>
                                                    <th>Name-img-tag</th>
                                                    <th>Status</th>
                                                    <th>Details</th>
                                                    <th>Update</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>

                                            <tbody className="overflow-x-scroll" >
                                                {
                                                    data.map((contest, i) => < tr key={i} >
                                                        <th>
                                                            {i + 1}
                                                        </th>
                                                        <td>
                                                            <div className="flex items-center gap-3">
                                                                <div className="avatar">
                                                                    <div className=" w-16 h-16 rounded-3xl">
                                                                        <img src={contest.img} alt="Avatar Tailwind CSS Component" />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="font-bold">{contest.name}</div>
                                                                    <div className="text-sm mt-1 "><span className="p-1 text-[10px]  bg-primary2 text-white rounded-full">{contest.tag}</span></div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <p><span className={contest.status === "pending" && "p-1 px-2 bg-yellow-200 rounded-full" || contest.status === "approved" && "p-1 px-2 bg-green-300 rounded-full"}>{contest.status}</span></p>
                                                        </td>
                                                        <td>
                                                            {
                                                                contest.status === "approved" ?
                                                                    <button
                                                                        disabled
                                                                        className="btn btn-sm lg:btn-md bg-primary0 text-primary4 hover:bg-purple-950">
                                                                        Details
                                                                    </button>
                                                                    :
                                                                    <Link to={`/contestDetail/${contest._id}`}>
                                                                        <button

                                                                            className="btn btn-sm lg:btn-md bg-primary0 text-primary4 hover:bg-purple-950">
                                                                            Details
                                                                        </button>
                                                                    </Link>
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                contest.status === "approved" ?
                                                                    <button
                                                                        disabled
                                                                        className="btn btn-sm lg:btn-md btn-warning btn-outline">Update</button>
                                                                    :
                                                                    <Link to={`/dashboard/updateContest/${contest._id}`}>
                                                                        <button

                                                                            className="btn btn-sm lg:btn-md btn-warning btn-outline">Update</button>
                                                                    </Link>
                                                            }

                                                        </td>
                                                        <th>
                                                            <button
                                                                disabled={contest.status === "approved"}
                                                                onClick={() => handelDelete(contest._id)}
                                                                className="btn btn-sm lg:btn-md btn-error btn-outline">delete</button>
                                                        </th>
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

export default MyCreatedContest;