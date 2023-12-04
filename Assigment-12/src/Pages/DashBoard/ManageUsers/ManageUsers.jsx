import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

import Title from "../../../component/Title/Title";
import Divider from "../../../component/Divider/Divider";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";


const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()



    const { refetch, data: AllUsers = [], isPending } = useQuery({
        queryKey: ['AllUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    const handelRole = (event, name, _id) => {

        Swal.fire({
            title: `Are you sure? promote ${name} as an ${event.target.value} `,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Promote it!"
        }).then((result) => {
            if (result.isConfirmed) {

                const Role = event.target.value
                console.log(Role, _id)
                axiosSecure.patch(`/users/admin/${_id}`, { Role })
                    .then(res => {
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                title: "Promoted!",
                                text: "An User has been promoted",
                                icon: "success"
                            });
                            refetch()
                            console.log(event.target.value, name)
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    })


            }

        });


    };
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

                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }

                    })
            }
        });

    }
    return (
        <>
            <Title>Manage user</Title>
            <Divider text={"All Users"} />
            {
                isPending ?
                    <div className="text-center mt-36">
                        <CircularProgress color="secondary" />
                    </div>
                    :
                    <div>
                        <div className="overflow-x-scroll md:overflow-x-hidden px-10">
                            <table className="table overflow-x-scroll ">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>
                                            #
                                        </th>

                                        <th>Name&Photo</th>
                                        <th>email</th>
                                        <th>Role</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row  */}
                                    {
                                        AllUsers.map((user, i) => <tr key={i}>
                                            <th>
                                                {i + 1}
                                            </th>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={user.photo} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{user.name}</div>

                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {user.email}
                                                <br />

                                            </td>
                                            {
                                                !user.role ?
                                                    <td>
                                                        <select
                                                            onChange={() => handelRole(event, user.name, user._id)}
                                                            className="select select-primary ">
                                                            <option disabled selected>Role</option>
                                                            <option className="p-4">Admin</option>
                                                            <option className="p-4">Creator</option>

                                                        </select>
                                                    </td>

                                                    :
                                                    <td><span className={user.role === 'Admin' ? "bg-green-200 p-1 px-4 rounded-full" : "bg-blue-200 p-1 px-4 rounded-full"}
                                                    >{user.role}</span></td>
                                            }

                                            <th>
                                                <button
                                                    onClick={() => handelDelete(user._id)}
                                                    className="btn btn-outline btn-error btn-circle"><FaTrashAlt className="text-2xl" /></button>
                                            </th>
                                        </tr>)
                                    }

                                </tbody>


                            </table>
                        </div>
                    </div>
            }
        </>
    );
};

export default ManageUsers;