import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Temperature from './pages/Temperature';
import CarbonDioxide from './pages/CarbonDioxide';
import Methane from './pages/Methane';
import NitrousOxide from './pages/NitrousOxide';
import PolarIce from './pages/PolarIce';

function App() {

  const navbarLinks = [
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
        <Route path="/" element={<Navigate to="/temperature" />} />
        <Route path="*" element={<Navigate to="/temperature" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
