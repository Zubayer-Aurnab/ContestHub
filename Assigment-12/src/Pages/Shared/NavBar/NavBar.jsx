import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import Dropdown from "../../../component/Dropdoun/Dropdown";


const NavBar = () => {
    const { user } = useAuth()
    // console.log(user)
    const navBarLinks = <>
        <li className="">
            <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "btn bg-primary0 text-primary4 hover:bg-black w-full" : "btn w-full text-primary4 hover:bg-primary0"
                }
            >
                Home
            </NavLink>
        </li>
        <li className="">
            <NavLink
                to="/blog"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "btn bg-primary0 text-primary4 hover:bg-black w-full" : "btn w-full text-primary4 hover:bg-primary0 "
                }
            >
                blog
            </NavLink>
        </li>
        <li className="">
            <NavLink
                to="/allContest"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "btn bg-primary0 text-primary4 hover:bg-black w-full" : "btn w-full text-primary4 hover:bg-primary0 "
                }
            >
                All-Contest
            </NavLink>
        </li>
       

    </>
    return (
        <div className="navbar  text-primary0 lg:w-4/5 mx-auto ">
            <div className="navbar-start">
                <div className="dropdown ">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className=" menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-60 space-y-2">
                        {
                            navBarLinks
                        }
                    </ul>
                </div>
                <Link to={'/'} className="flex items-center ">
                    <img className="w-16" src="https://i.ibb.co/GdKqZC9/Pngtree-letter-c-logo-design-4060951.png" alt="" />
                    <p className="text-xl md:text-3xl text-primary0 font-black -ml-2"> ontestHub </p>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className=" menu-horizontal px-1 border-4 rounded-2xl border-primary0 p-2 space-x-4 ">
                    {
                        navBarLinks
                    }
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <Dropdown />
                        :
                        <Link to={'/login'}>
                            <a className="btn btn-sm md:btn-md bg-primary0 text-primary4 hover:bg-black ">Log In</a>
                        </Link>

                }
            </div>
        </div>
    );
};

export default NavBar;