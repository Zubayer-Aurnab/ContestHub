import { useQuery } from "@tanstack/react-query";
import useAllContest from "../../../../Hooks/useAllContest";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';



const UserHome = () => {
    const [AllContest] = useAllContest()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { isPending, data: myPayments = [] } = useQuery({
        queryKey: ["my-contest", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment/${user.email}`)
            return res.data
        },
    })
    console.log(myPayments, isPending)
    const totalPrice = myPayments?.reduce((total, item) => total + Number(item.price), 0)
    console.log(totalPrice)
    const totalContest = AllContest?.length;
    const yourContest = myPayments?.length;
    const percentage = (yourContest / totalContest) * 100;

    const data = [
        { name: 'Total Contest', value: totalContest, percentage: 100 },
        { name: 'Your Contest', value: yourContest, percentage: percentage },
    ];
    const COLORS = ['#231942', '#be95c4',];


    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };


    return (
        <div >
           
            <div className="lg:flex items-center">
                <div className="flex-1 flex justify-center">
                    <PieChart width={400} height={400}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>

                        <Legend />
                        <Tooltip />

                    </PieChart>
                </div>
                <div className="flex-1 px-10">
                    <div className="flex flex-wrap justify-around shadow p-4 border">

                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mb-4">
                            <div className="p-4 border rounded-lg">
                                <div className="text-secondary">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <div className="text-lg font-semibold mt-2">CONTEST</div>
                                <div className="text-xl font-bold mt-2">{AllContest?.length}</div>

                            </div>
                        </div>

                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mb-4">
                            <div className="p-4 border rounded-lg">
                                <div className="text-secondary">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                                    </svg>
                                </div>
                                <div className="text-lg font-semibold mt-2">Your Contest</div>
                                <div className="text-xl font-bold mt-2">{myPayments?.length}</div>

                            </div>
                        </div>

                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mb-4">
                            <div className="p-4 border rounded-lg">
                                <div className="text-secondary">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                                    </svg>
                                </div>
                                <div className="text-lg font-semibold mt-2">TOTAL Spend</div>
                                <div className="text-xl font-bold mt-2">{totalPrice} $</div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserHome;