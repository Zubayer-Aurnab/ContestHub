import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { GrPrevious } from 'react-icons/gr';
import ContestCard from "../../component/ContestCard/ContestCard";
import Divider from "../../component/Divider/Divider";
import Title from "../../component/Title/Title";
import { GrNext } from 'react-icons/gr';
const AllContest = () => {
    // const [AllContest, contestDataLoading] = useAllContest()
    const [AllContest, setAllContest] = useState([])
    const [totalContest, setTotalContest] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 9
    const numberOfPages = Math.ceil(totalContest / itemsPerPage)
    const pages = [...Array(numberOfPages).keys()]
    const handelPrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handelNext = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }
    useEffect(() => {
        axios
            .get(`https://assigment-12-server-eta.vercel.app/pagination?page=${currentPage}&size=${itemsPerPage}`)
            .then((res) => {
                setAllContest(res.data.result);
                setTotalContest(res.data.total)

            });
    }, [currentPage, itemsPerPage]);
    console.log(AllContest)
    console.log(totalContest, itemsPerPage)
    return (
        <div>
            <div className="mb-10 mt-16">
                <Title>All Contest</Title>
                <Divider text={"Contest"} />
            </div>
            <div>
                {
                    AllContest.length == 0 ?
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
            <div className="my-10 flex justify-center">
                <div className="join">
                    <button onClick={handelPrev} className="join-item btn btn-md"><GrPrevious /></button>
                    {
                        pages.map((page, i) => <button key={i} onClick={() => setCurrentPage(page)} className={currentPage == page ? `join-item btn btn-md bg-[#231942] text-white` : `join-item btn btn-md`}>{page}</button>)
                    }

                    {/* <button className="join-item btn btn-md ">2</button>
                            <button className="join-item btn btn-md">3</button>
                            <button className="join-item btn btn-md">4</button>  */}

                    <button onClick={handelNext} className="join-item btn btn-md"><GrNext /></button>
                </div>
            </div>
        </div>
    );
};

export default AllContest;