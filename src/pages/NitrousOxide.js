import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";

import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import ErrorMessage from '../components/ErrorMessage';
import Spinner from '../components/Spinner';

import { getData } from "../utils/api";
import Chart from 'chart.js/auto';

function NitrousOxide() {

  const numberElements = 15;
  const [totalElements, setTotalElements] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(numberElements);
  const [spinner, setSpinner] = useState(true);
  const [chartData, setChartData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const fetchData = useCallback(async (startIndex, endIndex) => {
    setSpinner(true);
    try {
      const data = await getData("https://global-warming.org/api/nitrous-oxide-api");

      const totalElements = data.nitrous.length;
      setTotalElements(totalElements);
      const result = data.nitrous.slice(startIndex, endIndex);

      const labels = [];
      const averages = [];
      const trends = [];

      for (let i = 0; i < numberElements; i++) {
        if (i < result.length) {
          labels.push(`${parseInt(result[i].date).toFixed(0)}`);
          averages.push(result[i].average);
          trends.push(result[i].trend);
        } else {
          labels.push('');
          averages.push(null);
          trends.push(null);
        }
      }

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Average',
            data: averages,
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1,
            fill: false
          },
          {
            label: 'Trend',
            data: trends,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            fill: false
          }
        ]
      });

      setSpinner(false);

    } catch (error) {
      setErrorMessage("Error retrieving data. Try later.");
      setSpinner(false);
    }
  }, []);

  useEffect(() => {
    fetchData(startIndex, endIndex);
  }, [fetchData, startIndex, endIndex]);

  useEffect(() => {
    if (chartData) {
      const existingChartCanvas = document.getElementById('nitrousOxideChart');

      if (existingChartCanvas && Chart.getChart(existingChartCanvas)) {
        Chart.getChart(existingChartCanvas).destroy();
      }

      const ctx = existingChartCanvas.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Nitrous Oxide levels'
            }
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Year'
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Nitrous Oxide mole fraction (ppb)'
              }
            }
          }
        }
      });
    }
  }, [chartData]);

  return (
    <>
      <Helmet>
        <title>Nitrous Oxide | Global Warming</title>
      </Helmet>

      {spinner && <Spinner />}

      <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={`${collapsed ? "pointer-events-none opacity-70 lg:pointer-events-auto lg:opacity-100" : ""} 2xl:container mx-auto w-full h-screen flex flex-col justify-between items-center py-[2.5%] px-[5%] transition-all duration-300 ease-in-out`}>

        {!errorMessage && (
          <>
            <main className="w-full h-full min-h-[200px] flex justify-center items-center mx-auto mt-[50px] mb-5">
              <canvas id="nitrousOxideChart" className="canvas"></canvas>
            </main>

            <Pagination
              startIndex={startIndex}
              setStartIndex={setStartIndex}
              endIndex={endIndex}
              setEndIndex={setEndIndex}
              totalElements={totalElements}
              numberElements={numberElements}
            />
          </>
        )}

        {errorMessage && <ErrorMessage errorMessage={errorMessage} />}

      </div>
    </>
  );
}

export default NitrousOxide;
