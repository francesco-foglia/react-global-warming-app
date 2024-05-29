import PolarIceChart from "../components/PolarIceChart";

function PolarIce() {

  return (
    <PolarIceChart
      url="https://global-warming.org/api/arctic-api"
      // labelsData={["year", "month"]}
      // data1="area"
      // data2="extent"
      chartTitle="Polar ice extent"
      axis1="Year"
      axis2="Million square km"
      pageTitle="Polar Ice"
      chartId="polarIceChart"
    />
  );
}

export default PolarIce;
