import ChartComponent from "../components/ChartComponent";

function PolarIce() {

  return (
    <ChartComponent
      url="https://global-warming.org/api/arctic-api"
      labelsData={["year", "month"]}
      data1="area"
      data2="extent"
      chartTitle="Melted Polar Ice Caps"
      axis1="Year"
      axis2="Million square km"
      pageTitle="Polar Ice"
      chartId="polarIceChart"
    />
  );
}

export default PolarIce;
