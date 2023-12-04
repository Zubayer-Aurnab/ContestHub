
import Swal from "sweetalert2";
import useAllContest from "../../../Hooks/useAllContest";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Divider from "../../../component/Divider/Divider";
import Title from "../../../component/Title/Title";
import Timer from '../../../component/Timer/Timer'
import { useState } from "react";
import { CircularProgress } from "@mui/material";



const ManageContest = () => {
    const [AllContest, contestDataLoading, refetch] = useAllContest()
    const axiosSecure = useAxiosSecure()
    const [timeOut, setTimeOut] = useState(false)
    const handelApprove = (id) => {
        Swal.fire({
            title: "Are you sure want to Approve?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Approve it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/update-contest/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                title: "Approved!",
                                text: "Contest has been Approved.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
            }
        });
    }
    const handelDeleteContest = (id) => {
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
                axiosSecure.delete(`/delete-contest-admin/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }

                    })
            }
        });
    }
    return (
        <div>
            <Title>Manage Contest</Title>
            <Divider text={"Manage"} />
            {
                contestDataLoading ?
                    <div className="text-center mt-36">
                        <CircularProgress color="secondary" />
                    </div>
                    :
                    <div>
                        <div className="overflow-x-auto overflow-y-scroll h-[80vh]">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>

                                        </th>
                                        <th>Name/image</th>
                                        <th>Description</th>
                                        <th>status</th>
                                        <th>Approve</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody className="overflow-x-scroll overflow-y-scroll">
                                    {/* row 1 */}
                                    {
                                        AllContest.map((con, i) => <tr key={i}>
                                            <th>
                                                {i + 1}
                                            </th>
                                            <td>
                                                <div className="items-center gap-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <img src={con.img} alt="Avatar Tailwind CSS Component" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">{con.name}</div>
                                                            <div className="text-sm mt-1"><span className="p-1 px-2 bg-primary2 text-white rounded-full ">{con.tag}</span></div>
                                                        </div>
                                                    </div>
                                                    <div className="text-sm mt-10">
                                                        <Timer targetDate={con.timeToEnd} setTimeOut={setTimeOut} />

                                                    </div>

                                                </div>
                                            </td>
                                            <td className="">
                                                <p className="h-32 overflow-y-scroll w-96 lg:h-auto lg:w-auto lg:overflow-y-auto ">  {con.description}</p>
                                            </td>
                                            <td><span className={con.status === "pending" && "p-1 px-2 bg-yellow-200 rounded-full" || con.status === "approved" && "p-1 px-2 bg-blue-300 rounded-full"}>{con.status}</span></td>
                                            <th>
                                                <button
                                                    disabled={con.status === "approved"}
                                                    onClick={() => handelApprove(con._id)}
                                                    className="btn btn-sm lg:btn-md btn-outline btn-success ">Approve</button>
                                            </th>
                                            <th>
                                                <button
                                                    onClick={() => handelDeleteContest(con._id)}
                                                    className="btn btn-sm lg:btn-md btn-outline btn-error ">Delete</button>
                                            </th>
                                        </tr>)
                                    }

                                </tbody>


                            </table>
                        </div>


                    </div>
            }
        </div>
    );
};

export default ManageContest;