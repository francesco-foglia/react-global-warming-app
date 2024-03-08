import ChartComponent from "../components/ChartComponent";

function Methane() {

  return (
    <ChartComponent
      url="https://global-warming.org/api/methane-api"
      labelsData={["date"]}
      data1="average"
      data2="trend"
      chartTitle="Methane levels"
      axis1="Year"
      axis2="PartPer billion (ppb)"
      pageTitle="Methane"
      chartId="methaneChart"
    />
  );
}

export default Methane;
