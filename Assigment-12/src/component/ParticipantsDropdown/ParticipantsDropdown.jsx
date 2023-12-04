import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const ParticipantsDropdown = ({ data, refetch }) => {
    const { participantsList } = data
    const axiosSecure = useAxiosSecure()
    const makeWinner = (it) => {
        Swal.fire({
            title: "Are you sure?",
            text: `To make ${it.email} the winner for ${data.name}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, do it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const winnerEmail = it.email
                const winnerPhoto = it.Pimg
                const winner = { winnerEmail, winnerPhoto }
                console.log(winner, data._id)
                axiosSecure.patch(`/winner/${data._id}`, winner)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                title: "Selected!",
                                text: "Your file has been Selected.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })


            }
        });
    }
    // data.winnerEmail ? "hidden" :
    return (

        <div className=" z-50 ">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    {
                        data.winnerEmail ?
                            <p className="text-[9px] lg:text-sm"><span className="bg-red-300 p-1 px-2 rounded-full">winner declared</span></p>
                            :
                            <Menu.Button className="btn btn-outline btn-circle btn-primary text-primary4">
                                {participantsList?.length}

                            </Menu.Button>
                    }

                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
                        <div>
                            {
                                participantsList.map((item, i) => (
                                    <div key={i} className="px-1 py-1 ">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => makeWinner(item)}
                                                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                >

                                                    {item.email}
                                                </button>
                                            )}
                                        </Menu.Item>

                                    </div>
                                ))
                            }
                        </div>


                    </Menu.Items>
                </Transition>
            </Menu>
        </div>

    );
};


export default ParticipantsDropdown;