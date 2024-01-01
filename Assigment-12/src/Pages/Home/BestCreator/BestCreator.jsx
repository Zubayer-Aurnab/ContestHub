import { useQuery } from "@tanstack/react-query";
import Title from "../../../component/Title/Title";
import useAxiosPublic from "../../../Hooks/useAxiosPublic"


// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const BestCreator = () => {
    const axiosPublic = useAxiosPublic()
    const { data } = useQuery({
        queryKey: ['/best-creator'],
        queryFn: async () => {
            const res = await axiosPublic.get('/best-creator')
            return res.data
        }
    })
    console.log(data)
    return (
        <div className="mb-20">

            <div className="my-20">
                <Title>Best Creators</Title>
            </div>
            <div className="mt-10 w-4/5 mx-auto">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {
                        data?.map((person, i) => (
                            <SwiperSlide key={i} >
                                <div className="text-center space-y-4 p-4 mb-10">
                                    <div className="flex justify-center">
                                        <img src={person.image} className="w-24 h-24 rounded-full object-contain" alt="" />
                                    </div>
                                    <h1 className="text-xl font-bold text-primary0">{person.name}</h1>
                                    <p className="text-lg font-bold"> Contest : {person.contestName}</p>
                                    <p>{person.contestDescription}</p>
                                    <p><span className="p-1 px-2 bg-primary2 text-white rounded-full">{person.tags}</span></p>
                                </div>

                            </SwiperSlide>

                        ))
                    }
                </Swiper>
            </div>

        </div>
    );
};

export default BestCreator;