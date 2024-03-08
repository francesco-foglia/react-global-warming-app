import ChartComponent from "../components/ChartComponent";

function NitrousOxide() {

  return (
    <ChartComponent
      url="https://global-warming.org/api/nitrous-oxide-api"
      labelsData={["date"]}
      data1="average"
      data2="trend"
      chartTitle="Nitrous Oxide levels"
      axis1="Year"
      axis2="Nitrous Oxide mole fraction (ppb)"
      pageTitle="Nitrous Oxide"
      chartId="nitrousOxideChart"
    />
  );
}

export default NitrousOxide;
