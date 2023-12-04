import { CgProfile } from "react-icons/cg";
import { FaTrophy } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";

import { Link } from "react-router-dom";


const AdminRoutes = () => {
    return (
        <>
            <Link to={"/dashboard/manageUsers"} className="">
                <button className=" md:w-full text-[10px] font-thin md:font-bold md:text-sm btn  bg-primary0 text-white hover:bg-black ">
                Manage Users <FaPeopleGroup className="text-base md:text-xl" />
                </button>
            </Link>
            <Link to={"/dashboard/manageContest"} className="">
                <button className=" md:w-full text-[10px] font-thin md:font-bold md:text-sm btn  bg-primary0 text-white hover:bg-black ">
                Manage Contest <FaTrophy className="text-base md:text-xl" />
                </button>
            </Link>
            <Link to={"/dashboard/myProfile"} className="">
                <button className="md:w-full text-[10px] font-thin md:font-bold md:text-sm  btn  bg-primary0 text-white hover:bg-black">
                    My Profile <CgProfile className="text-base md:text-xl" />
                </button>
            </Link>
        </>
    );
};

export default AdminRoutes;