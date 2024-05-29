import axios from 'axios';

import Home from '../pages/Home';
import Temperature from '../pages/Temperature';
import CarbonDioxide from '../pages/CarbonDioxide';
import Methane from '../pages/Methane';
import NitrousOxide from '../pages/NitrousOxide';
import PolarIce from '../pages/PolarIce';
import OceanWarming from '../pages/OceanWarming';

export async function getData(url: string) {
  const response = await axios.get(url);

  if (response.data.result) {
    return response.data.result;
  } else if (response.data.co2) {
    return response.data.co2;
  } else if (response.data.methane) {
    return response.data.methane;
  } else if (response.data.nitrous) {
    return response.data.nitrous;
  } else if (response.data.arcticData) {
    return response.data.arcticData.data;
  }
}

export function getNavbarLinks() {
  return [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/temperature",
      name: "Temperature",
      component: Temperature
    },
    {
      path: "/carbon-dioxide",
      name: "CarbonDioxide",
      component: CarbonDioxide
    },
    {
      path: "/methane",
      name: "Methane",
      component: Methane
    },
    {
      path: "/nitrous-oxide",
      name: "NitrousOxide",
      component: NitrousOxide
    },
    {
      path: "/polar-ice",
      name: "PolarIce",
      component: PolarIce
    },
    {
      path: "/ocean-warming",
      name: "OceanWarming",
      component: OceanWarming
    }
  ];
}
