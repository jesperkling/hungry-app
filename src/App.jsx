// style
import "./App.css";

// React Router
import { Route, Routes } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import MapPage from "./pages/MapPage";
import RestaurantsPage from "./pages/RestaurantsPage";
import RestaurantPage from "./pages/RestaurantPage";
import TipsPage from "./pages/TipsPage";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/places" element={<RestaurantsPage />} />
        <Route path="/places/:id" element={<RestaurantPage />} />
        <Route path="/tips" element={<TipsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
