import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Temperature from './pages/Temperature';
import CarbonDioxide from './pages/CarbonDioxide';
import Methane from './pages/Methane';
import NitrousOxide from './pages/NitrousOxide';
import PolarIce from './pages/PolarIce';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/temperature" element={<Temperature />} />
        <Route path="/carbon-dioxide" element={<CarbonDioxide />} />
        <Route path="/methane" element={<Methane />} />
        <Route path="/nitrous-oxide" element={<NitrousOxide />} />
        <Route path="/polar-ice" element={<PolarIce />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
