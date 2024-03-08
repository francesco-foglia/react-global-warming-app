import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import { getData } from "../utils/api";
import Chart from 'chart.js/auto';

function NitrousOxide() {

  const numberElements = 20;
  const [totalElements, setTotalElements] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(numberElements);

  const fetchData = useCallback(async (startIndex, endIndex) => {
    try {
      const data = await getData("https://global-warming.org/api/nitrous-oxide-api");

      console.log(data);

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

      const existingChartCanvas = document.getElementById('nitrousOxideChart');

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
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Nitrous Oxide'
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
                text: 'Nitrous Oxide (ppb)'
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
          <canvas id="nitrousOxideChart" className="canvas"></canvas>
        </div>

        <Pagination
          startIndex={startIndex}
          setStartIndex={setStartIndex}
          endIndex={endIndex}
          setEndIndex={setEndIndex}
          totalElements={totalElements}
          fetchData={fetchData}
          numberElements={numberElements}
        />

      </main>
    </>
  );
}

export default NitrousOxide;
