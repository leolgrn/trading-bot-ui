import {useEffect, useRef, useState} from "react";
import { Chart, registerables } from 'chart.js';
import "./index.css";

Chart.register(...registerables);

const GraphComponent = (props) => {

    const { data } = props;

    const canvas = useRef(null);
    const [chart, setChart] = useState(null);

    useEffect(() => {
        const context = canvas.current.getContext('2d');
        setChart(new Chart(context, {
            type: 'line',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }));
    }, [])

    return (
        <div className="canvas-container">
            <canvas ref={canvas}/>
        </div>
    )
}

export default GraphComponent;
