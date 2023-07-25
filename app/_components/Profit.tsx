"use client";

import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import ProfitChart from "./ProfitChart";
import { getTotalValues } from "../_lib/data";

const queryClient = new QueryClient();

const ProfitContent = () => {
  const {
    isLoading,
    error,
    data: response,
  } = useQuery(["payload"], {
    queryFn: () =>
      fetch("https://dev-api2.profasee.com/reports/test-data").then((res) =>
        res.json()
      ),
  });

  const { payload } = response || {};
  const { results = [] } = payload || {};

  const totalValues = getTotalValues(results);

  console.log("totalValues", totalValues);

  return (
    <div className="flex w-full h-[400px] gap-x-4">
      <div className="grow">
        <ProfitChart data={results} />
      </div>
      <div className="w-[400px] flex flex-col items-center justify-center">
        <div className="flex gap-x-2">
          <div className="grow">
            <div className="bg-orange-500 rounded-lg text-white flex-col p-2">
              <div className="">Total Units(This year)</div>
              <div className="">{totalValues.units}</div>
            </div>
          </div>
          <div className="grow">
            <div className="bg-orange-500 rounded-lg text-white flex-col p-2">
              <div className="">Total Profit(This year)</div>
              <div className="">{totalValues.profit}</div>
            </div>
          </div>
        </div>

        <div className="flex gap-x-2">
          <div className="grow">
            <div className="bg-blue-500 rounded-lg text-white flex-col p-2 mt-2">
              <div className="">Total Units(Last year)</div>
              <div className="">{totalValues.unitsLastYear}</div>
            </div>
          </div>
          <div className="grow">
            <div className="bg-blue-500 rounded-lg text-white flex-col p-2 mt-2">
              <div className="">Total Profit(Last year)</div>
              <div className="">{totalValues.profitLastYear}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Profit() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProfitContent />
    </QueryClientProvider>
  );
}
