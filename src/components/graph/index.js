import {useCallback, useEffect, useRef, useState} from "react";
import { Chart, registerables } from 'chart.js';
import annotationPlugin from "chartjs-plugin-annotation";
import "./index.css";

Chart.register(...registerables);
Chart.register(annotationPlugin);

const GraphComponent = (props) => {

    const { data } = props;

    const canvas = useRef(null);
    const [needUpdate, setNeedUpdate] = useState(false);
    const [chart, setChart] = useState(null);

    const onlyCloseAndStrategies = (indicator) => {
        return indicator.name !== "open" && indicator.name !== "high" && indicator.name !== "low";
    }

    const getData = useCallback(() => {
        return {
            labels: data["time"],
            datasets: data["indicators"].filter(onlyCloseAndStrategies).map(indicator => {
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
        let annotations = [];
        for(let i = 0; i < data.report["transactions"].length; i += 2){
            if(i === data.report["transactions"].length - 1){
                console.log("last is buy");
                return annotations;
            }
            annotations.push({
                type: 'box',
                drawTime: "beforeDatasetsDraw",
                xMin:  data.report["transactions"][i]["buy"]["date"],
                xMax:  data.report["transactions"][i+1]["sell"]["date"],
                backgroundColor: data.report["transactions"][i+1]["sell"]["cash"] - data.report["transactions"][i]["buy"]["cash"] >= 0 ? "rgba(64, 251, 151, 0.2)" : "rgba(245, 71, 59, 0.2)",
                borderColor: "rgba(255, 255, 255, 0)"
            })
        }
        return annotations;
    }, [data])

    useEffect(() => {
        if(data !== null) {
            if(needUpdate){
                chart.data = getData()
                chart.options.plugins.annotation.annotations = getAnnotations()
                chart.update()
            } else {
                const context = canvas.current.getContext('2d');
                setChart(new Chart(context, {
                    type: 'line',
                    data: getData(),
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        animation: false,
                        normalized: true,
                        plugins: {
                            tooltip: {
                                mode: 'index',
                                intersect: false,
                                backgroundColor: "rgba(0, 0, 0, 1)",
                                titleFont: {
                                    size: 15
                                },
                                bodyFont: {
                                    size: 15,
                                    lineHeight: 1.5,
                                    weight: "bold"
                                }
                            },
                            legend: {
                                display: false
                            },
                            annotation: {
                                annotations: getAnnotations()
                            }
                                
                        },
                        hover: {
                            mode: 'index',
                            intersect: false
                        },
                        // scales: {
                        //     y: {
                        //         ticks: {
                        //             stepSize: 1000
                        //         }
                        //     },
                        //     x: {
                        //         time: {
                        //             stepSize: 1000
                        //         },
                        //         grid: {
                        //             display:false,
                        //             drawBorder: false
                        //         }
                        //     }
                        // }
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
