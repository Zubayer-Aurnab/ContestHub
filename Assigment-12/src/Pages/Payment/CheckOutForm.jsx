import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";



const CheckOutForm = (data) => {
    const stripe = useStripe();
    const [clientSecret, setClientSecret] = useState('')
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const navigate = useNavigate()
    console.log(user)
    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: data.data.price })
            .then(res => {
                setClientSecret(res.data.clientSecret)
            })
    }, [])
    console.log(data)
    const handelSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
        // confirm the payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName,
                }
            }
        })
        if (confirmError) {
            console.log('confirm error')
            Swal.fire({
                icon: "error",
                title: `${confirmError.message}`,
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });

        }
        else {
            console.log(paymentIntent)


            const payment = {
                email: user?.email,
                price: data?.data?.price,
                name: data?.data?.name,
                description: data?.data?.description,
                img: data?.data?.img,
                contestId: data?.data?._id,
                tag: data?.data?.tag,
                date: new Date()

            }
            console.log(payment)
            const res = await axiosSecure.post('/payment', payment)
            console.log(res.data)
            if (res.data.insertedId) {

                const id = data?.data?._id
                const email = user?.email
                const Pimg = user?.photoURL
                const participate = {email,Pimg}
                console.log(participate)
                axiosSecure.post(`/participate/${id}`, participate)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                icon: "success",
                                title: `payment successful!`,
                                text: `your Payment id is : ${paymentIntent.id}  `,

                            });
                            navigate('/dashboard/myRegisteredContest')
                        }
                    })

            }

        }

    }
    return (
        <div className="p-4">
            <div className="text-center font-bold mt-10">
                <h1 className=" text-xl md:text-2xl">{data.data.name}</h1>
                <p className=" text-xl md:text-2xl mt-5 ">Enroll Price : <span className="italic bg-green-100 rounded-full p-2">{data.data.price}$</span></p>
            </div>
            <form onSubmit={handelSubmit} className=" lg:w-1/2 mx-auto p-4 bg-white rounded shadow-xl lg:mt-36">
                <div className="mb-4 border p-4">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
                <button
                    type="submit"
                    disabled={!stripe || !clientSecret}
                    className="w-full bg-primary0 btn hover:bg-purple-950 text-primary4 mt-8"
                >
                    Pay
                </button>
            </form>

        </div >
    );
};

export default CheckOutForm;