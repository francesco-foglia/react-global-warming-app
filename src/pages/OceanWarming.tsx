import ChartComponent from "../components/ChartComponent";

function OceanWarming() {

  return (
    <ChartComponent
      url="https://global-warming.org/api/ocean-warming-api"
      labelsData={["0"]}
      data1="1"
      data2={undefined}
      chartTitle="Global Ocean Temperature Anomalies"
      axis1="Year"
      axis2="Celsius"
      pageTitle="Ocean Warming"
      chartId="oceanWarmingChart"
    />
  );
}

export default OceanWarming;
