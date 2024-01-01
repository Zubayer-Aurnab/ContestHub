import { useState } from "react";
import Banner from "./Banner/Banner";
import TopContest from "./TopContest/TopContest";
import BestCreator from "./BestCreator/BestCreator";
import Sponsors from "./Sponsors/Sponsors";



const Home = () => {
    const [search, setSearch] = useState("")
    // console.log(search)

    return (
        <div>
            <Banner setSearch={setSearch} />
            <TopContest search={search} />
            <BestCreator />
            <Sponsors />

        </div>
    );
};

export default Home;
