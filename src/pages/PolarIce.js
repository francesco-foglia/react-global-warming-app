import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";

import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import ErrorMessage from '../components/ErrorMessage';
import Spinner from '../components/Spinner';

import { getData } from "../utils/api";
import Chart from 'chart.js/auto';

function PolarIce() {

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
      const data = await getData("https://global-warming.org/api/arctic-api");

      const totalElements = data.arcticData.length;
      setTotalElements(totalElements);
      const result = data.arcticData.slice(startIndex, endIndex);

      const labels = [];
      const areas = [];
      const extents = [];

      for (let i = 0; i < numberElements; i++) {
        if (i < result.length) {
          labels.push(`${result[i].year}/${result[i].month}`);
          areas.push(result[i].area);
          extents.push(result[i].extent);
        } else {
          labels.push('');
          areas.push(null);
          extents.push(null);
        }
      }

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Extent',
            data: extents,
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1,
            fill: false
          },
          {
            label: 'Area',
            data: areas,
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
      const existingChartCanvas = document.getElementById('polarIceChart');

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
            legend: {
              display: true,
              position: 'top',
            },
            title: {
              display: true,
              text: 'Melted Polar Ice Caps'
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
                text: 'Million square km'
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
        <title>Polar Ice | Global Warming</title>
      </Helmet>

      {spinner && <Spinner />}

      <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={`${collapsed ? "pointer-events-none opacity-70 lg:pointer-events-auto lg:opacity-100" : ""} 2xl:container mx-auto w-full h-screen flex flex-col justify-between items-center py-[2.5%] px-[5%] transition-all duration-300 ease-in-out`}>

        {!errorMessage && (
          <>
            <main className="w-full h-full min-h-[200px] flex justify-center items-center mx-auto mt-[50px] mb-5">
              <canvas id="polarIceChart" className="canvas"></canvas>
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

export default PolarIce;
