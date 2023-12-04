import { Link } from "react-router-dom";
import { GrCheckboxSelected } from "react-icons/gr";
import { GiLaurelsTrophy } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";


const UserRoutes = () => {
    return (
        <>
            {/* User Routes */}
            <Link to={"/dashboard/myRegisteredContest"} className="">
                <button className="md:w-full text-[10px] font-thin md:font-bold md:text-sm btn  bg-primary0 text-white hover:bg-black">
                    My Registered Contest <GrCheckboxSelected className="text-base md:text-xl" />
                </button>
            </Link>
            <Link to={"/dashboard/myWinning"} className="">
                <button className="md:w-full text-[10px] font-thin md:font-bold md:text-sm  btn  bg-primary0 text-white hover:bg-black">
                    My Winning Contest <GiLaurelsTrophy className="text-base md:text-xl" />
                </button>
            </Link>
            <Link to={"/dashboard/myProfile"} className="">
                <button className="md:w-full text-[10px] font-thin md:font-bold md:text-sm  btn  bg-primary0 text-white hover:bg-black">
                    My Profile <CgProfile className="text-base md:text-xl" />
                </button>
            </Link>
            {/* User Routes */}
        </>
    );
};

export default UserRoutes;