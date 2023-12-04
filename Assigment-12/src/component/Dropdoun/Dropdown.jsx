import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { FcMenu } from "react-icons/fc";
import { IoIosLogOut } from "react-icons/io";

const Dropdown = () => {
    const { user,logOutUser } = useAuth()
    return (
        <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">

            <img
                tabIndex={0}
                src={user?.photoURL}
                className="w-14 h-14 rounded-full object-cover"
                alt="" />
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 space-y-2 ">
                <li className="btn">
                    {user?.displayName}
                </li>
              
                <li className="btn  hover:bg-primary2  hover:text-white ">
                    <Link to={'/dashboard'} className=""> Dashboard <FcMenu className="text-2xl mb-1" /></Link>
                </li>
                <li className="btn  hover:bg-red-400  hover:text-white ">
                    <button onClick={logOutUser} className=""> LogOut <IoIosLogOut className="text-2xl mb-" /></button>
                </li>

            </ul>
        </div>
    );
};

export default Dropdown;