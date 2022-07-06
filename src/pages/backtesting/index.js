import { GraphComponent } from "../../components";
import {useCallback, useEffect, useState} from "react";
import apiService from "../../services/api.service";
import moment from "moment";

import "./index.css";

const BacktestingPage = (props) => {

    const [data, setData] = useState(null);
    // eslint-disable-next-line
    const [error, setError] = useState(null);

    const [startDate, setStartDate] = useState(moment().subtract(6, "months").format("DD-MM-YYYY"));
    const [endDate, setEndDate] = useState(moment().format("DD-MM-YYYY"));
    const [symbol, setSymbol] = useState("ETH");
    const [type, setType] = useState("EMA");
    const [unit, setUnit] = useState("hour");
    const [period1, setPeriod1] = useState(20); //7
    const [period2, setPeriod2] = useState(50); //25
    const [period3, setPeriod3] = useState(200); //99

    const applyChanges = useCallback(() => {
        if(
            startDate !== "" &&
            endDate !== "" &&
            symbol !== "" &&
            type !== "" &&
            unit !== ""
        ){
            apiService.backtest(startDate, endDate, symbol, type, unit, [period1, period2, period3])
                .then(setData)
                .catch(setError);
        }
    }, [startDate, endDate, symbol, type, unit, period1, period2, period3])

    useEffect(() => {
        applyChanges();
    }, [])

    return (
        <div className={"backtesting-container"}>
            <div className={"backtesting-input"}>
                <input type={"text"} value={startDate} onChange={(ev) => setStartDate(ev.target.value)}/>
                <input type={"text"} value={endDate} onChange={(ev) => setEndDate(ev.target.value)}/>
                <input type={"text"} value={symbol} onChange={(ev) => setSymbol(ev.target.value)}/>
                <input type={"text"} value={type} onChange={(ev) => setType(ev.target.value)}/>
                <input type={"text"} value={unit} onChange={(ev) => setUnit(ev.target.value)}/>
                <input type={"text"} value={period1} onChange={(ev) => setPeriod1(ev.target.value)}/>
                <input type={"text"} value={period2} onChange={(ev) => setPeriod2(ev.target.value)}/>
                <input type={"text"} value={period3} onChange={(ev) => setPeriod3(ev.target.value)}/>

                <div onClick={applyChanges}>backtest</div>
            </div>
            <div className={"backtesting-graph"}>
                <GraphComponent data={data}/>
            </div>
        </div>
    )
}

export default BacktestingPage;
