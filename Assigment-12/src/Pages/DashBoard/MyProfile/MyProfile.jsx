import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUserRole from "../../../Hooks/useUserRole";
import Divider from "../../../component/Divider/Divider";
import Title from "../../../component/Title/Title";
import { IoSettings } from "react-icons/io5";
import Swal from "sweetalert2";

const MyProfile = () => {
    const [UserRole, , refetch] = useUserRole()
    const axiosSecure = useAxiosSecure()
    const [disable, setDisable] = useState(false)
    // console.log([UserRole, isUserLoading])
    const handelProfileSetting = async (e) => {
        e.preventDefault()
        setDisable(true)
        const from = e.target
        const photo = from.photo.value
        const name = from.name.value
        const id = from.id.value
        console.log({ photo, name })
        console.log(id)
        const profile = { photo, name }
        axiosSecure.put(`/users/${id}`, profile)
            .then(res => {
                if (res.data.modifiedCount) {
                    setDisable(false)
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                    window.location.reload()
                }

            })
            .catch(err => {
                console.log(err)
            })


    }
    return (
        <div>
            <Title>My Profile</Title>
            <Divider text={"profile"} />
            <div className="mt-48 ">
                <div className="flex justify-center relative ">
                    <img className="w-52 h-52 object-cover rounded-full absolute -bottom-20 border-8 border-white" src={UserRole.photo} alt="" />
                </div>
                <div className="p-4 py-10 pt-28 space-y-4 bg-gradient-to-r from-primary1 via-primary3 to-primary4 text-white text-center md:rounded-2xl md:w-4/5 lg:w-1/2 mx-auto">
                    <h1 className="md:text-2xl">Name : {UserRole.name}</h1>
                    <p className="md:text-2xl" >Email : {UserRole.email}</p>
                    <p className="md:text-2xl">Id : {UserRole._id}</p>
                    <button
                        onClick={() => document.getElementById('my_modal_2').showModal()}
                        className="btn  text-white bg-primary0 border-none hover:bg-purple-950">Update Profile <IoSettings className="text-xl md:text-2xl mb-1" /> </button>
                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
                    {/* Open the modal using document.getElementById('ID').showModal() method */}

                    <dialog id="my_modal_2" className="modal text-black">
                        <div className="modal-box " >
                            <form
                                onSubmit={handelProfileSetting}
                                className="space-y-4" >
                                <div className="">
                                    <p htmlFor="">Name</p>
                                    <input
                                        defaultValue={UserRole.name}
                                        name="name"
                                        type="text"
                                        placeholder="Type here"
                                        className="input input-bordered input-primary w-full max-w-xs" />
                                </div>
                                <div className="">
                                    <p htmlFor="">Photo URL</p>
                                    <input
                                        defaultValue={UserRole.photo}
                                        name="photo"
                                        type="text"
                                        placeholder="Type here"
                                        className="input input-bordered input-primary w-full max-w-xs" />
                                </div>
                                <div className="">
                                    <p htmlFor="">Id</p>
                                    <input
                                        disabled
                                        defaultValue={UserRole._id}
                                        name="id"
                                        type="text"
                                        placeholder="Type here"
                                        className="input input-bordered input-primary w-full max-w-xs" />
                                </div>
                                <button
                                    disabled={disable}
                                    type="submit"
                                    className="btn bg-primary0 text-white hover:bg-purple-950">Save change</button>
                            </form>
                        </div>
                        <form method="dialog" className="modal-backdrop text-black">
                            <button

                            >close</button>
                        </form>
                    </dialog>

                </div>
            </div>
        </div>
    );
};

export default MyProfile;