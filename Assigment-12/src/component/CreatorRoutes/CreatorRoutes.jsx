import { Link } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BsPersonCheckFill } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

const CreatorRoutes = () => {
    return (
        <>
            <Link to={"/dashboard/addContest"} className="">
                <button className="  md:w-full text-[10px] font-thin md:font-bold md:text-sm btn  bg-primary0 text-white hover:bg-black ">
                    Add Contest <IoMdAddCircleOutline className="text-base md:text-xl" />
                </button>
            </Link>
            <Link to={"/dashboard/myCreatedContest"} className="">
                <button className="md:w-full text-[10px] font-thin md:font-bold md:text-sm btn  bg-primary0 text-white hover:bg-black ">
                    My Created Contest <BsPersonCheckFill className="text-base md:text-xl" />
                </button>
            </Link>
            <Link to={"/dashboard/contestSubmitted"} className="">
                <button className="md:w-full text-[10px] font-thin md:font-bold md:text-sm btn  bg-primary0 text-white hover:bg-black ">
                    Contest Submitted <FaPeopleGroup className="text-base md:text-xl" />
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

export default CreatorRoutes;