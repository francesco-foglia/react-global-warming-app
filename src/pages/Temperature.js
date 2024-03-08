import ChartComponent from "../components/ChartComponent";

function Temperature() {

  return (
    <ChartComponent
      url="https://global-warming.org/api/temperature-api"
      labelsData={["time"]}
      data1="station"
      data2="land"
      chartTitle="Global temperature anomalies"
      axis1="Year"
      axis2="Celsius"
      pageTitle="Temperature"
      chartId="temperatureChart"
    />
  );
}

export default Temperature;
