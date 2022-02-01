import { GraphComponent } from "../../components";
import {useEffect, useState} from "react";
import apiService from "../../services/api.service";

const BacktestingPage = (props) => {

    const [data, setData] = useState(null);

    useEffect(() => {
            apiService.getHistoday("01-01-2022", "31-01-2022", "ETH")
                .then(setData)
                .catch(console.error);
    }, [])

    return (
        <GraphComponent data={data}/>
    )
}

export default BacktestingPage;