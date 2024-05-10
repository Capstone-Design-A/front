import React from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  Title,
  BarController,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from "./MonthlySales.module.css";

Chart.register(BarController, CategoryScale, LinearScale, BarElement, Title);

function MonthlySales() {
  const salesData = {
    labels: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    datasets: [
      {
        label: "월별 판매량",
        data: [100, 150, 200, 180, 250, 220, 300, 230, 310, 170, 220, 250], // 판매량 데이터 (임의의 데이터)
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, "rgba(92, 89, 232, 0.8)");
          gradient.addColorStop(1, "rgba(92, 89, 232, 0)");

          return gradient;
        },
      },
    ],
  };

  const options = {
    scales: {
      y: {
        grid: {
          display: false,
        },
        ticks: {
          beginAtZero: true,
        },
      },
      x: {
        grid: {
          display: false,
        },
        type: "category",
        labels: [
          "1월",
          "2월",
          "3월",
          "4월",
          "5월",
          "6월",
          "7월",
          "8월",
          "9월",
          "10월",
          "11월",
          "12월",
        ],
      },
    },
  };

  return (
    <div className={styles.container}>
      <h1>월별 판매량</h1>
      <div className={styles.bar}>
        <Bar data={salesData} options={options} />
      </div>
    </div>
  );
}

export default MonthlySales;
