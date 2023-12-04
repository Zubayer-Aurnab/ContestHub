import {  Outlet } from "react-router-dom";
import UserRoutes from "../../component/UserRoutes/UserRoutes";
import BasicRoutes from "../../component/BasicRoutes/BasicRoutes";
import CreatorRoutes from "../../component/CreatorRoutes/CreatorRoutes";
import AdminRoutes from "../../component/AdminRoutes/AdminRoutes";
import useUserRole from "../../Hooks/useUserRole";
import {  LinearProgress } from "@mui/material";


const Dashboard = () => {

    const [UserRole, isUserLoading] = useUserRole()
    // console.log(UserRole)
    return (
        <div className=" md:flex">
            <div className=" md:bg-primary1 text-white w-full md:w-[35%] lg:w-72 md:h-screen ">
                {/* <h1 className="text-primary0  text-center  italic font-bold  text-2xl md:hidden mb-5 ">DashBoard</h1> */}
                <div className=" flex justify-center flex-wrap mt-5  md:gap-0  p-1 md:p-7 md:space-y-4 space-x-2 md:space-x-0  md:menu md:mt-10 ">
                    {
                        isUserLoading ?
                            (
                                <LinearProgress />
                            )
                            :
                            (
                                <>
                                    {UserRole.role === 'Admin' && <AdminRoutes />}
                                    {UserRole.role === 'Creator' && <CreatorRoutes />}
                                    {!UserRole.role && <UserRoutes />}
                                </>
                            )
                    }
                    <div className="divider hidden md:flex">_</div>
                    <BasicRoutes />
                </div>
            </div>
            <div className="divider flex md:hidden"> Dashboard</div>
            <div className=" h-screen flex-1 ">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;