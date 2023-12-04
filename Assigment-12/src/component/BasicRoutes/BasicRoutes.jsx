import { Link } from "react-router-dom";
import { FaBook, FaHome } from "react-icons/fa";
import { GiTrophyCup } from "react-icons/gi";

const BasicRoutes = () => {
    return (
        <>
            <Link to={"/"} className="">
                <button className="md:w-full text-[10px] font-thin md:font-bold md:text-sm  btn  bg-primary0 text-white hover:bg-black">
                    Home <FaHome className="text-base md:text-xl mb-1" />
                </button>
            </Link>
            <Link to={"/blog"} className="">
                <button className="md:w-full text-[10px] font-thin md:font-bold md:text-sm  btn bg-primary0 text-white hover:bg-black">
                    Blog <FaBook className="text-base md:text-xl" />
                </button>
            </Link>
            <Link to={"/blog"} className="">
                <button className="md:w-full text-[10px] font-thin md:font-bold md:text-sm  btn bg-primary0 text-white hover:bg-black">
                    All-Contest <GiTrophyCup className="text-base md:text-xl" />
                </button>
            </Link>
        </>
    );
};

export default BasicRoutes;