import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getNavbarLinks } from "./utils/utils";

function App() {

  const navbarLinks = getNavbarLinks();

  return (
    <BrowserRouter>
      <Routes>
        {navbarLinks.map((link) => (
          <Route key={link.name} path={link.path} element={<link.component />} />
        ))}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
