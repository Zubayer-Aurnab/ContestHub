import Lottie from "lottie-react";
import bannerjson from '../../../../public/banner.json'
import { FcSearch } from "react-icons/fc";
import Typed from 'react-typed';
const Banner = ({ setSearch }) => {
    const handelSearchSubmit = e => {
        e.preventDefault()
        const form = e.target
        const searchData = form.search.value
        // console.log(searchData)
        setSearch(searchData)

    }
    return (
        <div className="my-11 md:my-24 lg:my-32 ">
            <div className="md:flex items-center space-y-6 ">
                <div className=" flex-1">
                    <Lottie
                        className="h-96"
                        animationData={bannerjson} />
                </div>
                <div className=" flex-1  text-center md:text-left  ">
                    <h1 className="text-primary0 text-3xl md:text-4xl font-extrabold mb-3">Welcome to ContestHub</h1>
                    <p className="text-xl md:text-2xl text-primary1 font-medium">the ultimate platform where innovation meets <br /> recognition!</p>
                    <div className="mt-10 px-12 md:p-0 md:mt-10" >
                        <form
                            onSubmit={handelSearchSubmit}
                            className="">
                            <div className="relative z-0 md:w-1/2 mb-6 group">
                                <input
                                    type="text"
                                    name="search"
                                    id="floating_email"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-primary1 focus:outline-none focus:ring-0 focus:border-primary1 peer "
                                    placeholder=" "
                                  
                                />
                                <label
                                    htmlFor="floating_email"
                                    className="peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 left-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary1 peer-focus:dark:text-primary1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    <Typed

                                        strings={
                                            [
                                                'SEARCH BY TAG NAME'
                                            ]
                                        }
                                        typeSpeed={50}
                                        backSpeed={50}
                                        backDelay={3000}
                                        loop
                                    />
                                </label>
                                <button className=" p-3 absolute right-0 bottom-2">
                                    <FcSearch className="text-2xl lg:text-3xl" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;