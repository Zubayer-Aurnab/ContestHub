import { Link } from "react-router-dom";
import error from '../../../public/error.json'
import Lottie from "lottie-react";


const Error = () => {
    return (
        <div className="flex flex-col-reverse lg:flex-row justify-between items-center 
        w-4/5 mx-auto gap-5 p-4  h-screen">

            <div className="flex-1">
                <h1 className=" text-2xl md:text-4xl text-center lg:text-6xl font-bold italic my-10">

                    This Page Is , Currently  <br /> Not Available.</h1>
                
                <div className="mt-10 text-center ">
                    <Link to={'/'}>
                        <button className="btn btn-outline btn-error font-extrabold text-xl">GO HOME</button>
                    </Link>
                </div>

            </div>



            <div className="flex-1 justify-center items-center">
            <Lottie
                        className="h-96"
                        animationData={error} />

            </div>

        </div>
    );
};

export default Error;