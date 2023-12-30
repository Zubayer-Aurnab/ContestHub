import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import Blog from "../Pages/Blog/Blog";
import Login from "../Pages/Login/Login"
import Register from "../Pages/Register/Register";
import Dashboard from "../Pages/DashBoard/Dashboard";
import ManageUsers from "../Pages/DashBoard/ManageUsers/Manageusers";
import DashboardHome from "../Pages/DashBoard/DashboardHome/DashboardHome";
import MyProfile from "../Pages/DashBoard/MyProfile/MyProfile";
import ContestDetailPage from "../Pages/Home/ContestDetailPage/ContestDetailPage";
import AddContest from "../Pages/DashBoard/AddContest/AddContest";
import Payment from "../Pages/Payment/Payment";
import MyRegisteredContest from "../Pages/DashBoard/MyRegisteredContest/MyRegisteredContest";
import MyCreatedContest from "../Pages/DashBoard/MyCreatedContest/MyCreatedContest";
import ManageContest from "../Pages/DashBoard/ManageContest/ManageContest";
import UpdateContest from "../Pages/DashBoard/UpdateContest/UpdateContest";
import ContestSubmitted from "../Pages/DashBoard/ContestSubmitted/ContestSubmitted";
import MyWinning from "../Pages/DashBoard/MyWinning/MyWinning";
import AllContest from "../Pages/AllContest/AllContest";
import Error from "../Pages/Error/Error";
import Private from "./Private/Private";
// const UserRole = useUserRole()
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/blog',
                element: <Blog />,
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: '/contestDetail/:id',
                element: <Private><ContestDetailPage /> </Private>,
                loader: ({ params }) => fetch(`https://assigment-12-server-eta.vercel.app/single-contest/${params.id}`)
            },
            {
                path: '/allContest',
                element: <AllContest />
            }
        ]
    },
    {
        path: 'dashboard',
        element: <Private> <Dashboard /> </Private>,
        errorElement: <Error />,
        children: [

            {
                index: true,
                element: <Navigate to={"dashboardHome"} />
            },
            // admin//
            {

                path: 'manageUsers',
                element: <ManageUsers />,
            },
            {
                path: 'manageContest',
                element: <ManageContest />,
            },
            //creator routes//
            {
                path: 'addContest',
                element: <AddContest />,
            },
            {
                path: 'myCreatedContest',
                element: <MyCreatedContest />,
            },
            {
                path: 'updateContest/:id',
                element: <UpdateContest />,
                loader: ({ params }) => fetch(`https://assigment-12-server-eta.vercel.app/single-contest/${params.id}`)
            },
            {
                path: 'contestSubmitted',
                element: <ContestSubmitted />
            },
            //normal user//
            {
                path: 'myProfile',
                element: <MyProfile />
            },
            {
                path: 'dashboardHome',
                element: <DashboardHome />
            },
            {
                path: 'payment/:id',
                element: <Payment />,
                loader: ({ params }) => fetch(`https://assigment-12-server-eta.vercel.app/single-contest/${params.id}`)
            },
            {
                path: 'myRegisteredContest',
                element: <MyRegisteredContest />,
            },
            {
                path: 'myWinning',
                element: <MyWinning />
            }
        ]
    }

]);