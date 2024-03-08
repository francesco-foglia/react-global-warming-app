import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import Spinner from '../components/Spinner';
import { getData } from "../utils/api";
import Chart from 'chart.js/auto';

function Methane() {

  const numberElements = 18;
  const [totalElements, setTotalElements] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(numberElements);
  const [spinner, setSpinner] = useState(true);
  const [chartData, setChartData] = useState(null);

  const fetchData = useCallback(async (startIndex, endIndex) => {
    setSpinner(true);
    try {
      const data = await getData("https://global-warming.org/api/methane-api");

      console.log(data);

      const totalElements = data.methane.length;
      setTotalElements(totalElements);
      const result = data.methane.slice(startIndex, endIndex);

      const labels = result.map(element => element.date);
      const averages = result.map(element => element.average);
      const trends = result.map(element => element.trend);

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
      console.error("Errore nel recupero dei dati:", error);
    }
  }, []);

  useEffect(() => {
    fetchData(startIndex, endIndex);
  }, [fetchData, startIndex, endIndex]);

  useEffect(() => {
    if (chartData) {
      const existingChartCanvas = document.getElementById('methaneChart');

      if (existingChartCanvas && Chart.getChart(existingChartCanvas)) {
        Chart.getChart(existingChartCanvas).destroy();
      }

      const ctx = existingChartCanvas.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Methane levels'
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
                text: 'PartPer billion (ppb)'
              }
            }
          }
        }
      });
    }
  }, [chartData]);

  return (
    <>
      {spinner && <Spinner />}
      <Navbar />
      <main className="w-full h-screen flex flex-col justify-between items-center py-[2.5%] px-[5%]">

        <div className="w-full h-full flex justify-center items-center mx-auto mt-[50px] mb-5">
          <canvas id="methaneChart" className="canvas"></canvas>
        </div>

        <Pagination
          startIndex={startIndex}
          setStartIndex={setStartIndex}
          endIndex={endIndex}
          setEndIndex={setEndIndex}
          totalElements={totalElements}
          numberElements={numberElements}
        />

      </main>
    </>
  );
}

export default Methane;
