import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";

import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import ErrorMessage from '../components/ErrorMessage';
import Spinner from '../components/Spinner';

import { getData } from "../utils/api";
import Chart from 'chart.js/auto';

function ChartComponent({ url, labelsData, data1, data2, chartTitle, axis1, axis2, pageTitle, chartId }) {

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
      const data = await getData(url);

      const totalElements = (data.length === undefined) ? (Object.keys(data).length) : (data.length);
      setTotalElements(totalElements);
      const result = (data.length === undefined) ? (Object.entries(data).slice(startIndex, endIndex)) : (data.slice(startIndex, endIndex));

      const labels = [];
      const data_1 = [];
      const data_2 = [] || null;

      for (let i = 0; i < numberElements; i++) {
        if (i < result.length) {
          if (labelsData.length === 1) {
            labels.push(result[i][labelsData]);
          } else if (labelsData.length === 2) {
            labels.push(`${result[i][labelsData[0]]}/${result[i][labelsData[1]]}`);
          } else if (labelsData.length === 3) {
            labels.push(`${result[i][labelsData[0]]}/${result[i][labelsData[1]]}/${result[i][labelsData[2]]}`);
          }
          data_1.push(result[i][data1]);
          data2 && data_2.push(result[i][data2]);
        } else {
          labels.push('');
          data_1.push(null);
          data2 && data_2.push(null);
        }
      }

      setChartData({
        labels: labels,
        datasets: [
          {
            label: data1.length !== 1 ? data1 : pageTitle,
            data: data_1,
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1,
            fill: false
          },
          data2 && data_2 ? {
            label: data2,
            data: data_2,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            fill: false
          } : null
        ].filter(dataset => dataset !== null)
      });

      setSpinner(false);

    } catch (error) {
      setErrorMessage("Error retrieving data. Try later.");
      setSpinner(false);
    }
  }, [url, labelsData, data1, data2, pageTitle]);

  useEffect(() => {
    fetchData(startIndex, endIndex);
  }, [fetchData, startIndex, endIndex]);

  useEffect(() => {
    if (chartData) {
      const existingChartCanvas = document.getElementById(chartId);

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
              text: chartTitle
            }
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: axis1
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: axis2
              }
            }
          }
        }
      });
    }
  }, [chartData, chartTitle, axis1, axis2, chartId]);

  return (
    <>
      <Helmet>
        <title>{`${pageTitle} | Global Warming`}</title>
      </Helmet>

      {spinner && <Spinner />}

      <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={`${collapsed ? "pointer-events-none opacity-70 lg:pointer-events-auto lg:opacity-100" : ""} 2xl:container mx-auto w-full h-screen flex flex-col justify-between items-center py-[2.5%] px-[5%] transition-all duration-300 ease-in-out`}>

        {!errorMessage && (
          <>
            <main className="w-full h-full min-h-[200px] flex justify-center items-center mx-auto mt-[50px] mb-5">
              <canvas id={chartId} className="canvas"></canvas>
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

export default ChartComponent;
