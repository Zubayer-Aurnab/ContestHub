import { IoIosPeople } from "react-icons/io";
import { Link } from "react-router-dom";

const ContestCard = ({ data }) => {
    const { name, tag, img, participants, status, description, timeToEnd, participantsList, creatorImg, creatorEmail, price, _id } = data
    return (
        <div className={status === 'pending' ? "hidden" : "card  bg-base-100 shadow-xl p-4"}>
            <div className=" flex-row text-center lg:flex items-center justify-between mb-2">
               
                    <div className="flex items-center gap-2">
                        <img src={creatorImg} className="h-14 w-14 rounded-full border-8  object-cover" alt="" />
                        <p><span className="px-2 lg:px-4 bg-base-300 rounded-full py-1">{creatorEmail}</span></p>

                    </div>
                   
               
                <div>
                    <p><span className="bg-primary2 p-1 px-2 rounded-full text-white ">{tag}</span></p>
                </div>

            </div>

            <figure>
                <img src={img} className="w-96 h-96 object-cover rounded-2xl" alt="Shoes" />
            </figure>
            <div className="card-body ">
                <div className="flex justify-between mb-4">
                    <h2 className="card-title">{name}!</h2>
                    <div className="flex items-center gap-2  px-4 rounded-full text-blue-700">
                        <IoIosPeople className="text-2xl" /> <p className="text-xl"> {participantsList?.length || 0}</p>
                    </div>
                </div>
                <p>{description.slice(0, 250)}.....</p>
                <div className="card-actions  mt-10 ">
                    <Link className="w-full" to={`/contestDetail/${_id}`}>
                        <button className="btn bg-primary0 text-primary4 hover:bg-purple-950 w-full hover:scale-105 ">Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ContestCard;