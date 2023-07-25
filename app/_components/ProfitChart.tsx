"use client";

import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
  Legend,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { SellingModel, convertChartData } from "../_lib/data";
import { MOCK_DATA } from "../_lib/mockData";

const queryClient = new QueryClient();

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  LineController
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      // position: 'top' as const,
      display: true,
    },
    title: {
      display: true,
      text: "Profit",
    },
  },
  scales: {
    y: {
      display: true,
    },
    x: {
      ticks: {
        display: true,
      },
      grid: {
        drawBorder: false,
        display: false,
      },
    },
  },
};

interface ProfitCartProps {
  data: SellingModel[];
}

export default function ProfitChart(props: ProfitCartProps) {
  const { data } = props;

  const chartData = convertChartData(data);

  return <Line options={options} data={chartData} />;
}
