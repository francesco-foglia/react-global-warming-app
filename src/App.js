import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Temperature from './pages/Temperature';
import CarbonDioxide from './pages/CarbonDioxide';
import Methane from './pages/Methane';
import NitrousOxide from './pages/NitrousOxide';
import PolarIce from './pages/PolarIce';

function App() {

  const navbarLinks = [
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
    }
  ];

  return (
    <BrowserRouter>
      <Routes>
        {navbarLinks.map((link) => (
          <Route key={link.name} path={link.path} element={<link.component />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
