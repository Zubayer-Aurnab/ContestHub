import Divider from "../../component/Divider/Divider";
import Title from "../../component/Title/Title";
import { Elements } from "@stripe/react-stripe-js"
import CheckOutForm from "./CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useLoaderData } from "react-router-dom";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT)
const Payment = () => {
    const { name, price,description,img,_id,tag } = useLoaderData()
    const data = { name, price , description,img,_id,tag}
    console.log(data)
    return (
        <div>
            <Title>Payment Page</Title>
            <Divider text={"Payment"} />
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutForm data={data}></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;