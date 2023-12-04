import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUserRole from "../../../Hooks/useUserRole";
import Divider from "../../../component/Divider/Divider";
import Title from "../../../component/Title/Title";


const AddContest = () => {
    const [UserRole] = useUserRole()
    const axiosSecure = useAxiosSecure()
    console.log(UserRole)
    const handelAddContest = async e => {
        e.preventDefault()
        const from = e.target
        const name = from.name.value
        const img = from.photo.value
        const price = from.price.value
        const tag = from.tag.value
        const description = from.description.value
        const timeToEnd = from.date.value
        const prize = from.prize.value
        const status = 'pending'
        const creatorImg = UserRole.photo
        const creatorEmail = UserRole.email

        console.log({ name, img, price, tag, description, timeToEnd, prize, creatorEmail, creatorImg, status })
        const contest = { name, img, price, tag, description, timeToEnd, prize, creatorEmail, creatorImg, status, participantsList: [] }
        const res = await axiosSecure.post('/contest', contest)
        if (res.data.insertedId) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });
            from.reset()

        }
    }
    return (
        <div className="overflow-y-scroll h-[100vh]">
            <Title>Add Contest</Title>
            <Divider text={"ADD"} />
            <div className="p-4">
                <form
                    onSubmit={handelAddContest}
                    className="   lg:w-3/5 mx-auto rounded-2xl p-5 border text-black" >

                    <div className="relative z-0  mb-5 group">
                        <input
                            type="text"
                            name="photo"
                            id="floating_email"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-primary1 focus:outline-none focus:ring-0 focus:border-primary1 peer "
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="floating_email"
                            className="peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 left-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary1 peer-focus:dark:text-primary1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Photo URL
                        </label>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-10">
                        <div>
                            <div className="relative z-0  mb-5 group">
                                <input
                                    type="text"
                                    name="name"
                                    id="floating_email"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-primary1 focus:outline-none focus:ring-0 focus:border-primary1 peer "
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="floating_email"
                                    className="peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 left-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary1 peer-focus:dark:text-primary1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Contest Name
                                </label>
                            </div>
                        </div>
                        <div>
                            <div className="relative z-0  mb-5 group">
                                <input
                                    type="number"
                                    name="price"
                                    id="floating_email"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-primary1 focus:outline-none focus:ring-0 focus:border-primary1 peer "
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="floating_email"
                                    className="peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 left-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary1 peer-focus:dark:text-primary1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Enroll price
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-10   items-center ">
                        <div>
                            <div className="relative z-0  mb-5 group ">
                                <select required name="tag" className="select select-primary w-full max-w-xs">
                                    <option disabled  selected>Contest Tags</option>
                                    <option>Business</option>
                                    <option>Medical</option>
                                    <option>Article</option>
                                    <option>Gaming.</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div className="relative z-0  mb-5 group">
                                <label > Description</label>
                                <textarea required name="description" className="textarea textarea-primary w-full" placeholder="Bio"></textarea>

                            </div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-10  ">
                        <div>
                            <div className="relative z-0  mb-5 group ">
                                <input required name="date" type="date" className="border border-primary p-2 px-4 rounded-3xl" />
                            </div>
                        </div>
                        <div>
                            <div className="relative z-0  mb-5 group">
                                <input
                                    type="number"
                                    name="prize"
                                    id="floating_email"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-primary1 focus:outline-none focus:ring-0 focus:border-primary1 peer "
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="floating_email"
                                    className="peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 left-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary1 peer-focus:dark:text-primary1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Prize Money
                                </label>
                            </div>
                        </div>

                    </div>
                    <div className="w-1/2 mx-auto my-10">
                        <button className="btn bg-primary0 text-primary4 hover:scale-105 hover:bg-purple-950 w-full ">ADD</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddContest;