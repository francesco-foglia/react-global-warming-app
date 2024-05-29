import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import Navbar from "./Navbar";
import Pagination from "./Pagination";
import ErrorMessage from './ErrorMessage';
import Spinner from './Spinner';
import { getData } from "../utils/utils";
import Chart from 'chart.js/auto';

interface ChartComponentProps {
  url: string;
  // labelsData: any;
  // data1: any;
  // data2: any;
  chartTitle: string;
  axis1: string;
  axis2: string;
  pageTitle: string;
  chartId: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: (number | null)[];
    borderColor: string;
    backgroundColor: string;
    borderWidth: number;
    fill: boolean;
  }[];
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  url,
  // labelsData,
  // data1,
  // data2,
  chartTitle,
  axis1,
  axis2,
  pageTitle,
  chartId
}) => {

  const numberElements = 15;
  const [totalElements, setTotalElements] = useState<number>(0);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(numberElements);
  const [spinner, setSpinner] = useState<boolean>(true);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const formatLabel = (label: string): string => {
    const year = label.substring(0, 4);
    const month = label.substring(4);
    return `${year}.${month}`;
  };

  const fetchData = useCallback(async (startIndex: number, endIndex: number) => {
    setSpinner(true);
    try {
      const data = await getData(url);

      const keys = Object.keys(data).slice(startIndex, endIndex);
      const labels = keys.map(key => formatLabel(key));
      const values = keys.map(key => data[key].monthlyMean);

      // Fill with null to reach the number of elements
      while (labels.length < numberElements) {
        labels.push('');
        values.push(null);
      }

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'extent',
            data: values,
            borderColor: 'rgba(0, 123, 255, 1)',
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderWidth: 1,
            fill: false,
          },
        ],
      });

      setTotalElements(Object.keys(data).length);
      setSpinner(false);
    } catch (error) {
      setErrorMessage("Error retrieving data. Try later.");
      setSpinner(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData(startIndex, endIndex);
  }, [fetchData, startIndex, endIndex]);

  useEffect(() => {
    if (chartData) {
      const existingChartCanvas = document.getElementById(chartId) as HTMLCanvasElement;

      if (existingChartCanvas && Chart.getChart(existingChartCanvas)) {
        Chart.getChart(existingChartCanvas)?.destroy();
      }

      const ctx = existingChartCanvas.getContext('2d');
      if (ctx) {
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
    }
  }, [chartData, chartTitle, axis1, axis2, chartId]);

  return (
    <>
      <Helmet>
        <title>{`${pageTitle} | Global Warming`}</title>
      </Helmet>

      {spinner && <Spinner />}

      <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={`${collapsed ? "pointer-events-none opacity-70 lg:pointer-events-auto lg:opacity-100" : ""} 2xl:container mx-auto w-full h-dvh flex flex-col justify-between items-center py-[2.5%] px-[5%] transition-all duration-300 ease-in-out bg-white`}>

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
