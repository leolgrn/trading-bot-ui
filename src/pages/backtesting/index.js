import { GraphComponent } from "../../components";
import {useCallback, useState} from "react";
import apiService from "../../services/api.service";

import "./index.css";

const BacktestingPage = (props) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const [startDate, setStartDate] = useState("01-01-2022");
    const [endDate, setEndDate] = useState("01-02-2022");
    const [symbol, setSymbol] = useState("ETH");
    const [type, setType] = useState("sma");
    const [unit, setUnit] = useState("day");
    const [periods, setPeriods] = useState([25, 100]);

    const applyChanges = useCallback(() => {
        if(
            startDate !== "" &&
            endDate !== "" &&
            symbol !== "" &&
            type !== "" &&
            unit !== "" &&
            periods.length > 0
        ){
            apiService.backtest(startDate, endDate, symbol, type, unit, periods)
                .then(setData)
                .catch(setError);
        }
    }, [startDate, endDate, symbol, type, unit, periods])

    return (
        <div className={"backtesting-container"}>
            <div className={"backtesting-input"}>
                <input type={"text"} value={startDate} onChange={(ev) => setStartDate(ev.target.value)}/>
                <input type={"text"} value={endDate} onChange={(ev) => setEndDate(ev.target.value)}/>
                <input type={"text"} value={symbol} onChange={(ev) => setSymbol(ev.target.value)}/>
                <input type={"text"} value={type} onChange={(ev) => setType(ev.target.value)}/>
                <input type={"text"} value={unit} onChange={(ev) => setUnit(ev.target.value)}/>
                {
                    periods.map((period, i) => (
                        <input key={i} type={"text"} value={period} onChange={(ev) => {
                            periods[i] = period;
                            setPeriods(periods);
                        }}/>
                    ))
                }
                <div onClick={applyChanges}>backtest</div>
            </div>
            <div className={"backtesting-graph"}>
                <GraphComponent data={data}/>
            </div>
        </div>
    )
}

export default BacktestingPage;
