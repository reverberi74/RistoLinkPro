import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
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

export default function LineChartTurnover({ dataset, filter = 'anno' }) {
    const labels = getLabels(filter);

    const data = {
        labels,
        datasets: [
            {
                label: '',
                data: labels.map(() => faker.number.int({ min: 0, max: 40000 })),
                borderColor: '#3BC8E1',
                backgroundColor: '#3BC8E1',
            },
        ],
    };

    return <Line options={options} data={data} />;
}