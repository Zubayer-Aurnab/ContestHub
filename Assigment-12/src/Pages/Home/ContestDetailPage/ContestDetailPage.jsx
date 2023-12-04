import { Link, useLoaderData } from "react-router-dom";
import Title from "../../../component/Title/Title";
import { IoIosPeople } from "react-icons/io";
import Timer from "../../../component/Timer/Timer";
import Lottie from "lottie-react";
import winner from '../../../../public/winner.json'
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";



const ContestDetailPage = () => {

    const data = useLoaderData()

    const { name, tag, img, description, timeToEnd, participantsList, creatorImg, creatorEmail, price, _id, prize, winnerEmail, winnerPhoto } = data

    const { user } = useAuth()

    const [timeOut, setTimeOut] = useState(false)


    return (
        <div className="">
            <Title>Contest Details </Title>
            <div>
                <div>
                    <img src={img} className="md:w-4/5 mx-auto h-[50vh] md:h-[70vh] lg:h-[70vh] object-contain  " alt="" />
                </div>
                <div className="p-4 md:w-4/5 mx-auto ">
                    <h1 className="text-4xl text-center font-bold mb-8 md:mb-10 lg:my-10">{name}</h1>
                    <h1 className="md:text-xl">{description}</h1>
                </div>
                <div className=" p-4 md:w-4/5 mx-auto ">
                    <div className="grid grid-cols-1 lg:grid-cols-12 mt-10 items-center">
                        <div className="lg:col-span-4 ">
                            <div>
                                <div className="md:flex justify-between mb-4 space-y-4 md:space-y-0  ">

                                    <div className="flex items-center gap-2">
                                        <img src={creatorImg} className="h-14 w-14 rounded-full border-8 " alt="" />
                                        <p><span className="px-2 lg:px-4 bg-base-300 rounded-full py-1">{creatorEmail}</span></p>

                                    </div>
                                    <div className="flex items-center justify-center gap-2 bg-blue-300 px-2 md:px-4 rounded-full w-60">
                                        <p>total participants</p>
                                        <IoIosPeople className="text-xl" /> <p className="text-xl"> {participantsList?.length || 0}</p>
                                    </div>

                                </div>
                                <div className="flex items-center justify-between mt-10">
                                    <div>
                                        <p className="">
                                            <span className="bg-primary2 p-1 px-2 rounded-full text-white">{tag}</span>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xl md:text-2xl ">Prize Money <span className="font-bold italic">{prize} $</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" mt-10 md:mt-20  lg:mt-0 lg:col-span-8">
                            <div className="flex justify-center">
                                {
                                    winnerEmail ?
                                        <div className=" text-center w-full relative ">
                                            <Title>Winner</Title>
                                            <div className="flex justify-center">
                                                <img src={winnerPhoto} className="w-48 h-48 object-cover rounded-full" alt="" />
                                            </div>
                                            <div className="w-40 absolute right-1/2 bottom-1">
                                                <Lottie
                                                    animationData={winner}
                                                />

                                            </div>
                                            <div>
                                                <p className="mt-5 text-xl ">{winnerEmail}</p>
                                            </div>

                                        </div>
                                        :
                                        <Timer targetDate={timeToEnd} setTimeOut={setTimeOut} />
                                }

                            </div>
                        </div>
                    </div>
                    <div className="mt-24 mb-10  w-1/2 mx-auto">
                        {
                            timeOut ?
                                <div>
                                    <button disabled className="btn bg-primary0 text-primary4 hover:bg-purple-950 hover:scale-110 transition-all w-full"> Enroll Now {price} $ </button>
                                    <p className="text-center text-rose-700 mt-2">Time end for this contest  </p>
                                </div>
                                :
                                winnerEmail ?
                                    <button disabled className="btn bg-primary0 text-primary4 hover:bg-purple-950 hover:scale-110 transition-all w-full"> Enroll Now {price} $ </button>
                                    :

                                    user?.email === creatorEmail ?
                                        <button
                                            disabled
                                            className="btn bg-primary0 text-primary4 hover:bg-purple-950 hover:scale-110 transition-all w-full"> Enroll Now {price} $ </button>
                                        :
                                        <Link Link to={`/dashboard/payment/${_id}`}>
                                            <button

                                                className="btn bg-primary0 text-primary4 hover:bg-purple-950 hover:scale-110 transition-all w-full"> Enroll Now {price} $ </button>
                                        </Link>


                        }

                    </div>
                </div>
            </div>
        </div >
    );
};

export default ContestDetailPage;