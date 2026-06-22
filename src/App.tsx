import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Market from "@/pages/Market";
import EquipmentDetail from "@/pages/EquipmentDetail";
import Finance from "@/pages/Finance";
import Services from "@/pages/Services";
import Compute from "@/pages/Compute";
import PriceIndex from "@/pages/PriceIndex";
import Bidding from "@/pages/Bidding";
import Store from "@/pages/Store";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Market />} />
          <Route path="/equipment/:id" element={<EquipmentDetail />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/services" element={<Services />} />
          <Route path="/compute" element={<Compute />} />
          <Route path="/price-index" element={<PriceIndex />} />
          <Route path="/bidding" element={<Bidding />} />
          <Route path="/store/:id" element={<Store />} />
        </Route>
      </Routes>
    </Router>
  );
}
