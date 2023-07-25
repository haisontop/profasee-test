import { ScriptableContext } from "chart.js";

export const chartColors = {
  default: {
    primary: "#f97316",
    info: "#3b82f6",
  },
};

const datasetObject = (
  color: "primary" | "info",
  data: number[],
  label: string
) => {
  return {
    fill: true,
    label: label,
    borderColor: chartColors.default[color],
    data,
  };
};

export interface SellingModel {
  date: string;
  units: string;
  units_lastyear: string;
  revenue: string;
  revenue_lastyear: string;
  cogs: string;
  cogs_lastyear: string;
  ads_cost: string | number;
  ads_cost_lastyear: string | number;
  ppc_revenue: string | number;
  ppc_revenue_lastyear: string | number;
}

const calculateProfit = (
  revenue: number,
  cogs: number,
  adsCost: number,
  ppcRevenue: number
) => {
  const convertedRevenue = Number.isNaN(revenue) ? 0 : revenue;
  const convertedCogs = Number.isNaN(cogs) ? 0 : cogs;
  const convertedAdsCost = Number.isNaN(adsCost) ? 0 : adsCost;
  const convertedPpcRevenue = Number.isNaN(ppcRevenue) ? 0 : ppcRevenue;

  const profit =
    convertedRevenue - convertedCogs - convertedAdsCost + convertedPpcRevenue;

  return profit;
};

export const convertChartData = (data: SellingModel[]) => {
  const labels = [];

  for (let i = 0; i <= data.length - 1; i++) {
    labels.push(`${new Date(data[i].date).toDateString()}`);
  }

  return {
    labels,
    datasets: [
      datasetObject(
        "primary",
        data.map((item) =>
          calculateProfit(
            parseFloat(item.revenue),
            parseFloat(item.cogs),
            typeof item.ads_cost === "string"
              ? parseFloat(item.ads_cost)
              : item.ads_cost,

            typeof item.ppc_revenue === "string"
              ? parseFloat(item.ppc_revenue)
              : item.ppc_revenue
          )
        ),
        "This year"
      ),
      datasetObject(
        "info",
        data.map((item) =>
          calculateProfit(
            parseFloat(item.revenue_lastyear),
            parseFloat(item.cogs_lastyear),

            typeof item.ads_cost_lastyear === "string"
              ? parseFloat(item.ads_cost_lastyear)
              : item.ads_cost_lastyear,

            typeof item.ppc_revenue_lastyear === "string"
              ? parseFloat(item.ppc_revenue_lastyear)
              : item.ppc_revenue_lastyear
          )
        ),
        "Last year"
      ),
    ],
  };
};

export const getTotalValues = (data: SellingModel[]) => {
  return data.reduce(
    (total, item) => {
      console.log("total", total.profit, item);

      return {
        ...total,
        units: total.units + (item.units !== null ? parseInt(item.units) : 0),
        unitsLastYear:
          total.unitsLastYear +
          (item.units_lastyear !== null ? parseInt(item.units_lastyear) : 0),
        profit:
          total.profit +
          calculateProfit(
            parseFloat(item.revenue),
            parseFloat(item.cogs),
            typeof item.ads_cost === "string"
              ? parseFloat(item.ads_cost)
              : item.ads_cost,

            typeof item.ppc_revenue === "string"
              ? parseFloat(item.ppc_revenue)
              : item.ppc_revenue
          ),
        profitLastYear:
          total.profit +
          calculateProfit(
            parseFloat(item.revenue_lastyear),
            parseFloat(item.cogs_lastyear),
            typeof item.ads_cost_lastyear === "string"
              ? parseFloat(item.ads_cost_lastyear)
              : item.ads_cost_lastyear,

            typeof item.ppc_revenue_lastyear === "string"
              ? parseFloat(item.ppc_revenue_lastyear)
              : item.ppc_revenue_lastyear
          ),
      };
    },
    {
      units: 0,
      unitsLastYear: 0,
      profit: 0,
      profitLastYear: 0,
    }
  );
};
