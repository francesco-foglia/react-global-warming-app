import { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";

import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import ErrorMessage from '../components/ErrorMessage';
import Spinner from '../components/Spinner';

import { getData } from "../utils/utils";
import Chart from 'chart.js/auto';

interface Props {
  url: string;
  labelsData: string[];
  data1: string;
  data2?: string;
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
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    fill: boolean;
  }[];
}

function ChartComponent({ url, labelsData, data1, data2, chartTitle, axis1, axis2, pageTitle, chartId }: Props) {
  const numberElements = 15;
  const [totalElements, setTotalElements] = useState<number>(0);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(numberElements);
  const [spinner, setSpinner] = useState<boolean>(true);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const fetchData = useCallback(async (startIndex: number, endIndex: number) => {
    setSpinner(true);
    try {
      const data = await getData(url);

      const totalElements = Array.isArray(data) ? data.length : Object.keys(data).length;
      setTotalElements(totalElements);
      const result = Array.isArray(data) ? data.slice(startIndex, endIndex) : Object.entries(data).slice(startIndex, endIndex);

      const labels: string[] = [];
      const data_1: (number | null)[] = [];
      const data_2: (number | null)[] = [];

      for (let i = 0; i < numberElements; i++) {
        if (i < result.length) {
          if (labelsData.length === 1) {
            labels.push(result[i][labelsData[0]]);
          } else if (labelsData.length === 2) {
            labels.push(`${result[i][labelsData[0]]}/${result[i][labelsData[1]]}`);
          } else if (labelsData.length === 3) {
            labels.push(`${result[i][labelsData[0]]}/${result[i][labelsData[1]]}/${result[i][labelsData[2]]}`);
          }
          data_1.push(result[i][data1]);
          if (data2) data_2.push(result[i][data2]);
        } else {
          labels.push('');
          data_1.push(null);
          if (data2) data_2.push(null);
        }
      }

      const datasets = [
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
      ].filter(dataset => dataset !== null) as {
        label: string;
        data: (number | null)[];
        backgroundColor: string;
        borderColor: string;
        borderWidth: number;
        fill: boolean;
      }[];

      setChartData({ labels, datasets });

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
      const existingChartCanvas = document.getElementById(chartId) as HTMLCanvasElement | null;

      if (existingChartCanvas && Chart.getChart(existingChartCanvas)) {
        Chart.getChart(existingChartCanvas)?.destroy();
      }

      if (existingChartCanvas) {
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
