import {useCallback, useEffect, useRef, useState} from "react";
import { Chart, registerables } from 'chart.js';
import randomColor from "randomcolor"
import "./index.css";

Chart.register(...registerables);

const GraphComponent = (props) => {

    const { data } = props;

    const canvas = useRef(null);
    const [needUpdate, setNeedUpdate] = useState(false);
    const [chart, setChart] = useState(null);

    const getData = useCallback(() => {
        return {
            labels: data["time"],
            datasets: data["indicators"].map(indicator => {
                return {
                    label: indicator["name"],
                    data: indicator["values"],
                    borderColor: indicator["color"],
                    pointBorderWidth: 1,
                    pointRadius: 1
                }
            })
        }
    }, [data])

    const getAnnotations = useCallback(() => {
        return data.report["transactions"].map(transaction => {
            return {
                type: 'box',
                drawTime: "beforeDatasetsDraw",
                xMin: transaction["buy"]["date"],
                xMax: transaction["sell"]["date"],
                xScaleID: 'x-axis-0',
                backgroundColor: transaction["sell"]["cash"] >= 0 ? "rgba(64, 251, 151, 0.2)" : "rgba(245, 71, 59, 0.2)",
                borderColor: "rgba(255, 255, 255, 0)"
            }
        })
    }, [data])

    useEffect(() => {
        if(data !== null) {
            if(needUpdate){
                chart.data = getData()
                chart.update()
            } else {
                const context = canvas.current.getContext('2d');
                setChart(new Chart(context, {
                    type: 'line',
                    data: getData(),
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            tooltip: {
                                mode: 'index',
                                intersect: false
                            }
                        },
                        hover: {
                            mode: 'index',
                            intersect: false
                        },
                        annotation: {
                            drawTime: 'afterDatasetsDraw',
                            annotations: getAnnotations()
                        },
                        scales: {
                            x: {
                                ticks: {
                                    stepSize: 20
                                }
                            }
                        }
                    }
                }));
                setNeedUpdate(true)
            }
        }
    }, [data, chart, needUpdate, getData])

    return (
        <div className="canvas-container">
            {
                data === null ?
                    <div className="canvas-no-data"><span>Pas de données à charger</span></div> :
                    <canvas ref={canvas}/>
            }
        </div>
    )
}

export default GraphComponent;
