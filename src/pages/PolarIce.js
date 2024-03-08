import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import { getData } from "../utils/api";
import Chart from 'chart.js/auto';

function PolarIce() {

  const numberElements = 15;
  const [totalElements, setTotalElements] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(numberElements);

  const fetchData = useCallback(async (startIndex, endIndex) => {
    try {
      const data = await getData("https://global-warming.org/api/arctic-api");

      console.log(data);

      const totalElements = data.arcticData.length;
      setTotalElements(totalElements);
      const result = data.arcticData.slice(startIndex, endIndex);

      const labels = [];
      const areas = [];
      const extents = [];

      for (let i = 0; i < numberElements; i++) {
        if (i < result.length) {
          labels.push(`${result[i].month}/${result[i].year}`);
          areas.push(result[i].area);
          extents.push(result[i].extent);
        } else {
          labels.push('');
          areas.push(null);
          extents.push(null);
        }
      }

      const existingChartCanvas = document.getElementById('polarIceChart');

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
              label: 'Areas',
              data: areas,
              backgroundColor: 'rgba(0, 123, 255, 0.5)',
              borderColor: 'rgba(0, 123, 255, 1)',
              borderWidth: 1,
              fill: false
            },
            {
              label: 'Extents',
              data: extents,
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
              text: 'Polar Ice'
            }
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Month/Year'
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Polar Ice (10^6 km^2)'
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
          <canvas id="polarIceChart" className="canvas"></canvas>
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

export default PolarIce;
