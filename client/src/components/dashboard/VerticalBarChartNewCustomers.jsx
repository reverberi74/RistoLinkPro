import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            max: 60, // <-- forza il massimo a 60
            ticks: {
                stepSize: 20, // <-- intervallo fra i tick: 0, 20, 40, 60...
            },
            grid: {
                drawBorder: false,
                color: '#eee',
            },
        },
    },
};

const getLabels = (filterType) => {
    switch (filterType) {
        case 'anno':
            return ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Set', 'Ott', 'Nov', 'Dic'];
        case 'mese':
            return ['Sett. 1', 'Sett. 2', 'Sett. 3', 'Sett. 4'];
        case 'settimana':
            return ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
        default:
            return [];
    }
};

export default function VerticalBarChartNewCustomers({ dataset, filter = 'anno' }) {
    const labels = getLabels(filter);

    const data = {
        labels,
        datasets: [
            {
                label: '',
                data: labels.map(() => faker.number.int({ min: 0, max: 60 })),
                borderColor: '#3BC8E1',
                backgroundColor: '#3BC8E1',
            },
        ],
    };

    return <Bar options={options} data={data} />;
}