// style
import "./App.css";

// React Router
import { Route, Routes } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Map from "./pages/Map";
import Restaurants from "./pages/Restaurants";
import Restaurant from "./pages/Restaurant";
import Tips from "./pages/Tips";

// Components
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <h1>Hungry App</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurants/:id" element={<Restaurant />} />
        <Route path="/tips" element={<Tips />} />
      </Routes>
    </div>
  );
}

export default App;
