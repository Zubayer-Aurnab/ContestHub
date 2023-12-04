import Lottie from "lottie-react";
import warn from '../../../public/warn.json'

const NoData = ({  text }) => {
    return (
        <div className="text-center p-4">
            <Lottie
                className="h-96"
                animationData={warn} />
                <div>
                    <h1 className="text-xl lg:text-2xl">
                        {text}
                    </h1>
                </div>
        </div>
    );
};

export default NoData;