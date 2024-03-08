import axios from 'axios';

export async function getData(url) {
  const response = await axios.get(url);
  return response.data;
}

export function getNavbarLinks() {
  return [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/temperature",
      name: "Temperature",
    },
    {
      path: "/carbon-dioxide",
      name: "Carbon Dioxide",
    },
    {
      path: "/methane",
      name: "Methane",
    },
    {
      path: "/nitrous-oxide",
      name: "Nitrous Oxide",
    },
    {
      path: "/polar-ice",
      name: "Polar Ice",
    },
    {
      path: "/ocean-warming",
      name: "Ocean Warming",
    }
  ];
}
