import useAllContest from "../../../Hooks/useAllContest";
import useUserRole from "../../../Hooks/useUserRole";
import Divider from "../../../component/Divider/Divider";
import Title from "../../../component/Title/Title";
import CreatorHome from "./CreatorHome/CreatorHome";
import UserHome from "./UserHome/UserHome";


const DashboardHome = () => {
    const [AllContest] = useAllContest()
    const [UserRole] = useUserRole()
    const totalContest = AllContest.length

    return (
        <div>
            <Title>Dashboard Home</Title>
            <Divider text={"HOME"} />
            <div>
               
                <div>
                    {
                        UserRole.role === "Creator" && <CreatorHome />
                    }
                    {
                        !UserRole.role && <UserHome />
                    }
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;