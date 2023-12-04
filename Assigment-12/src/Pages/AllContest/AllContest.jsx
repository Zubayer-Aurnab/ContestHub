import { CircularProgress } from "@mui/material";
import useAllContest from "../../Hooks/useAllContest";
import ContestCard from "../../component/ContestCard/ContestCard";
import Divider from "../../component/Divider/Divider";
import Title from "../../component/Title/Title";


const AllContest = () => {
    const [AllContest, contestDataLoading, refetch] = useAllContest()
    return (
        <div>
            <div className="mb-10 mt-16">
                <Title>All Contest</Title>
                <Divider text={"Contest"} />
            </div>
            <div>
                {
                    contestDataLoading ?
                        <div className="text-center mt-36 h-screen">
                            <CircularProgress color="secondary" />
                        </div>
                        :
                        <div className=" p-2 md:p-4 lg:w-4/5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {
                                AllContest?.map((contestData, i) => (
                                    <ContestCard key={i} data={contestData} />
                                ))
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default AllContest;