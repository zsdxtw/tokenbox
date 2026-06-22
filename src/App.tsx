import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Market from "@/pages/Market";
import EquipmentDetail from "@/pages/EquipmentDetail";
import Finance from "@/pages/Finance";
import Services from "@/pages/Services";
import Compute from "@/pages/Compute";
import Solutions from "@/pages/Solutions";
import PolicyNews from "@/pages/PolicyNews";
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
          <Route path="/compute" element={<Compute />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/services" element={<Services />} />
          <Route path="/bidding" element={<Bidding />} />
          <Route path="/policy" element={<PolicyNews />} />
          <Route path="/store/:id" element={<Store />} />
          {/* Legacy redirect: price-index merged into market & compute */}
          <Route path="/price-index" element={<Navigate to="/market" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}
