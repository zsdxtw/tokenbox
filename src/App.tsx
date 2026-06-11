import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import AiComputing from "@/pages/AiComputing";
import SecondHand from "@/pages/SecondHand";
import PowerEquipment from "@/pages/PowerEquipment";
import Cooling from "@/pages/Cooling";
import Network from "@/pages/Network";
import Brands from "@/pages/Brands";
import Market from "@/pages/Market";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import About from "@/pages/About";
import Help from "@/pages/Help";
import Contact from "@/pages/Contact";
import NewsDetail from "@/pages/NewsDetail";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import UserCenter from "@/pages/UserCenter";
import Orders from "@/pages/Orders";
import Solutions from "@/pages/Solutions";
import Finance from "@/pages/Finance";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-nest-bg text-nest-text font-body flex flex-col">
        <Header />
        <main className="flex-1 pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai-computing" element={<AiComputing />} />
            <Route path="/secondhand" element={<SecondHand />} />
            <Route path="/power" element={<PowerEquipment />} />
            <Route path="/cooling" element={<Cooling />} />
            <Route path="/network" element={<Network />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/market" element={<Market />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<UserCenter />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
