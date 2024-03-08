import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import { getData } from "../utils/api";
import Chart from 'chart.js/auto';

function CarbonDioxide() {

  const numberElements = 15;
  const [totalElements, setTotalElements] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(numberElements);

  const fetchData = useCallback(async (startIndex, endIndex) => {
    try {
      const data = await getData("https://global-warming.org/api/co2-api");

      console.log(data);

      const totalElements = data.co2.length;
      setTotalElements(totalElements);
      const result = data.co2.slice(startIndex, endIndex);

      const labels = [];
      const cycleValues = [];
      const trendValues = [];

      for (let i = 0; i < numberElements; i++) {
        if (i < result.length) {
          labels.push(`${result[i].day}/${result[i].month}/${result[i].year}`);
          cycleValues.push(result[i].cycle);
          trendValues.push(result[i].trend);
        } else {
          labels.push('');
          cycleValues.push(null);
          trendValues.push(null);
        }
      }

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

    } catch (error) {
      console.error("Errore nel recupero dei dati:", error);
    }
  }, []);

  useEffect(() => {
    fetchData(startIndex, endIndex);
  }, [fetchData, startIndex, endIndex]);

  return (
    <>
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
