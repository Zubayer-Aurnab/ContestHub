import Lottie from "lottie-react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import signUp from '../../../public/signUp.json'
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";



const Register = () => {
    const { GoogleAuth, createUser, UpdateUser } = useAuth()
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const location = useLocation()

    const GoogleRegister = () => {
        GoogleAuth()
            .then(res => {
                const userInfo = {
                    email: res?.user?.email,
                    name: res?.user?.displayName,
                    photo: res?.user?.photoURL
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Registration successful",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate(location?.state ? location.state : '/')
                    })

            })
            .catch()
    }
    const handelRegisterSubmit = e => {
        e.preventDefault()
        const from = e.target
        const name = from.name.value
        const email = from.email.value
        const password = from.password.value
        const photo = from.photo.value
        console.log({ name, email, password, photo })
        createUser(email, password)
            .then(res => {
                UpdateUser(name, photo)
                    .then(res => {
                        const user = { email, name, photo }
                        axiosPublic.post('/users', user)
                            .then(res => {
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        position: "center",
                                        icon: "success",
                                        title: "Registration successful",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate(location?.state ? location.state : '/')
                                }
                            })

                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: `error: ${err.message}`,
                    text: `error: ${err.message}`,
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
            })

    }
    return (
        <div>
            <section className="  flex items-center lg:h-screen ">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ">
                    <div className="flex flex-col justify-center   p-1 px-10  rounded-lg opacity-95">
                        <Lottie
                            animationData={signUp}
                        />

                    </div>
                    <div>
                        <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8  rounded-lg shadow-xl  bg-gradient-to-r from-primary1 via-primary3 to-primary4">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Register to  ContestHub
                            </h2>
                            <form
                                onSubmit={handelRegisterSubmit}
                                className="mt-8 space-y-6" action="#">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id=""
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder=" name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo URL</label>
                                    <input
                                        type="text"
                                        name="photo"
                                        id="photo"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder=" URL"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="@"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div className='flex flex-col lg:flex-row justify-between  space-y-4 lg:space-y-0'>
                                    <button
                                        type="submit"
                                        className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Register your account
                                    </button>

                                    <button
                                        onClick={GoogleRegister}
                                        type="submit"
                                        className="w-full px-5 py-3 text-base font-medium text-center text-black bg-white rounded-lg hover:bg-white focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-white dark:hover:bg-white dark:focus:ring-white flex items-center justify-center gap-4 "
                                    >
                                        Register with Google
                                        <FcGoogle className='text-xl' />
                                    </button>




                                </div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    Already Have an Account?   <Link to={'/login'} className="text-primary0 hover:underline  font-extrabold cursor-pointer"> LogIN</Link>
                                </div>



                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Register;