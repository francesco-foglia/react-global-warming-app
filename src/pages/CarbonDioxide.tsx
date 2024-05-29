import ChartComponent from "../components/ChartComponent";

function CarbonDioxide() {

  return (
    <ChartComponent
      url="https://global-warming.org/api/co2-api"
      labelsData={["year", "month", "day"]}
      data1="cycle"
      data2="trend"
      chartTitle="Carbon Dioxide levels"
      axis1="Year"
      axis2="PartPer million (ppm)"
      pageTitle="Carbon Dioxide"
      chartId="carbonDioxideChart"
    />
  );
}

export default CarbonDioxide;
