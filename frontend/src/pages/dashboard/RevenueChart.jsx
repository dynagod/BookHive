import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueChart = ({ data }) => {
    const monthlyData = data?.monthlyOrders || Array(12).fill(0).map((_, i) => ({
        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
        amount: 0,
    }));

    const chartData = {
        labels: monthlyData.map(item => item.month),
        datasets: [
            {
                label: 'Orders',
                data: monthlyData.map(item => item.amount),
                backgroundColor: 'rgba(124, 58, 237, 0.6)',
                borderColor: 'rgba(124, 58, 237, 1)',
                borderWidth: 1,
                borderRadius: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14,
                        family: 'Inter, sans-serif',
                    },
                    color: '#1f2937',
                },
            },
            title: {
                display: true,
                text: 'Monthly Orders Overview',
                font: {
                    size: 18,
                    family: 'Inter, sans-serif',
                    weight: 'bold',
                },
                color: '#1f2937',
                padding: {
                    bottom: 20,
                },
            },
            tooltip: {
                backgroundColor: '#1f2937',
                titleFont: { size: 14 },
                bodyFont: { size: 12 },
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.parsed.y}`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Orders',
                    font: {
                        size: 14,
                        family: 'Inter, sans-serif',
                    },
                    color: '#1f2937',
                },
                grid: {
                    color: '#e5e7eb',
                },
                ticks: {
                    color: '#1f2937',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Month',
                    font: {
                        size: 14,
                        family: 'Inter, sans-serif',
                    },
                    color: '#1f2937',
                },
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#1f2937',
                },
            },
        },
    };

    return (
        <div className="w-full h-[400px]">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default RevenueChart;