import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
    cutout: '65%',
    plugins: {
        legend: {
            display: false,
        },
    },
};

export const data = {
    labels: [],
    datasets: [
        {
            label: '',
            data: [37, 63],
            backgroundColor: [
                '#ffffff',
                '#070FA3',
            ],
        },
    ],
};

export function DoughnutChartPositiveRewievs() {
    return <Doughnut data={data} options={options} />;
}