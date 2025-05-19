import { BrowserRouter, Route, Routes } from "react-router-dom";
import Calendar from "pages/Calendar";
import Home from "pages/Home";
import MataKuliah from "pages/MataKuliah";
import KalendarAkademik from "pages/KalendarAkademik";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/calendar"
          element={<Calendar />}
        />
        <Route
          path="/mata-kuliah"
          element={<MataKuliah />}
        />
        <Route
          path="/kalendar-akademik"
          element={<KalendarAkademik />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
