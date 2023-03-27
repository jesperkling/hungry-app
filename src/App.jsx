// style
import "./App.css";

// React Router
import { Route, Routes } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import RestaurantsPage from "./pages/RestaurantsPage";
import RestaurantPage from "./pages/RestaurantPage";
import TipsPage from "./pages/TipsPage";

// Components
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/restaurants/:id" element={<RestaurantPage />} />
        <Route path="/tips" element={<TipsPage />} />
      </Routes>
    </div>
  );
}

export default App;
