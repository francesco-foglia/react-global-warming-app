import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import Spinner from '../components/Spinner';
import { getData } from "../utils/api";
import Chart from 'chart.js/auto';

function Temperature() {

  const numberElements = 19;
  const [totalElements, setTotalElements] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(numberElements);
  const [spinner, setSpinner] = useState(true);
  const [chartData, setChartData] = useState(null);

  const fetchData = useCallback(async (startIndex, endIndex) => {
    setSpinner(true);
    try {
      const data = await getData("https://global-warming.org/api/temperature-api");

      console.log(data);

      const totalElements = data.result.length;
      setTotalElements(totalElements);
      const result = data.result.slice(startIndex, endIndex);

      const labels = result.map(item => item.time);
      const stationData = result.map(item => item.station);
      const landData = result.map(item => item.land);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Station',
            data: stationData,
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1,
            fill: false
          },
          {
            label: 'Land',
            data: landData,
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
      const existingChartCanvas = document.getElementById('temperatureChart');

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
              text: 'Global temperature anomalies'
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
                text: 'Celsius'
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
      <div className="w-full h-screen flex flex-col justify-between items-center py-[2.5%] px-[5%]">

        <main className="w-full h-full flex justify-center items-center mx-auto mt-[50px] mb-5">
          <canvas id="temperatureChart" className="canvas"></canvas>
        </main>

        <Pagination
          startIndex={startIndex}
          setStartIndex={setStartIndex}
          endIndex={endIndex}
          setEndIndex={setEndIndex}
          totalElements={totalElements}
          numberElements={numberElements}
        />

      </div>
    </>
  );
}

export default Temperature;
