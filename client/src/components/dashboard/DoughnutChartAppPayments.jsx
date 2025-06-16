import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
    cutout: '65%',
    responsive: true,
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
            data: [15, 85],
            backgroundColor: [
                '#ffffff',
                '#3BC8E1',
            ],
        },
    ],
};

export function DoughnutChartAppPayments() {
    return <Doughnut data={data} options={options} />;
}