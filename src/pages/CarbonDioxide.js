import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import Spinner from '../components/Spinner';
import { getData } from "../utils/api";
import Chart from 'chart.js/auto';

function CarbonDioxide() {

  const numberElements = 15;
  const [totalElements, setTotalElements] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(numberElements);
  const [spinner, setSpinner] = useState(true);

  const fetchData = useCallback(async (startIndex, endIndex) => {
    setSpinner(true);
    try {
      const data = await getData("https://global-warming.org/api/co2-api");

      console.log(data);

      const totalElements = data.co2.length;
      setTotalElements(totalElements);
      const result = data.co2.slice(startIndex, endIndex);

      const labels = [];
      const cycleValues = [];
      const trendValues = [];

      result.forEach(element => {
        labels.push(`${element.day}/${element.month}/${element.year}`);
        cycleValues.push(element.cycle);
        trendValues.push(element.trend);
      });

      const existingChartCanvas = document.getElementById('carbonDioxideChart');

      if (existingChartCanvas && Chart.getChart(existingChartCanvas)) {
        Chart.getChart(existingChartCanvas).destroy();
      }

      const ctx = existingChartCanvas.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Cycle',
              data: cycleValues,
              backgroundColor: 'rgba(0, 123, 255, 0.5)',
              borderColor: 'rgba(0, 123, 255, 1)',
              borderWidth: 1,
              fill: false
            },
            {
              label: 'Trend',
              data: trendValues,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              fill: false
            }
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Carbon Dioxide'
            }
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Carbon Dioxide (ppm)'
              }
            }
          }
        }
      });

      setSpinner(false);

    } catch (error) {
      console.error("Errore nel recupero dei dati:", error);
    }
  }, []);

  useEffect(() => {
    fetchData(startIndex, endIndex);
  }, [fetchData, startIndex, endIndex]);

  return (
    <>
      {spinner && <Spinner />}
      <Navbar />
      <main className="w-full h-screen flex flex-col justify-between items-center py-[2.5%] px-[5%]">

        <div className="w-full h-full flex justify-center items-center mx-auto mt-[50px] mb-5">
          <canvas id="carbonDioxideChart" className="canvas"></canvas>
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

export default CarbonDioxide;
