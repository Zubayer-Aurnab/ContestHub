
import Title from "../../../component/Title/Title";
import ContestCard from "../../../component/ContestCard/ContestCard";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { CircularProgress } from "@mui/material";



const TopContest = ({ search }) => {
    // const [AllContest, contestDataLoading] = useAllContest()
    const [AllContest, setAllContest] = useState([])
    const [loading, setLoading] = useState("")
    const axiosPublic = useAxiosPublic()
    // console.log(AllContest, contestDataLoading)
    console.log(search)
    useEffect(() => {
        setLoading(true)
        axiosPublic.get(`/search?tag=${search}`)
            .then(res => {
                setAllContest(res.data)
                console.log(res.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [search])

    return (
        <div>
            <div className="mb-20">
                <Title>Top Contest's</Title>
            </div>
            {
                loading ?
                    <div className="text-center mt-36 h-screen">
                        <CircularProgress color="secondary" />
                    </div>
                    :
                    <div className=" p-2 md:w-4/5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {
                            AllContest?.slice(0,6).map((contestData, i) => (
                                <ContestCard key={i} data={contestData} />
                            ))
                        }
                    </div>
            }

        </div>
    );
};

export default TopContest;