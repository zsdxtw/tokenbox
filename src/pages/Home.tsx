import { motion } from 'framer-motion';
import HeroBanner from '../components/home/HeroBanner';
import SearchBar from '../components/home/SearchBar';
import MarketTicker from '../components/home/MarketTicker';
import QuickEntry from '../components/home/QuickEntry';
import HotProducts from '../components/home/HotProducts';
import CategoryGrid from '../components/home/CategoryGrid';
import TradeInBanner from '../components/home/TradeInBanner';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-0"
    >
      <HeroBanner />
      <SearchBar />
      <MarketTicker />
      <div className="space-y-4 py-4">
        <QuickEntry />
        <HotProducts />
        <CategoryGrid />
        <TradeInBanner />
      </div>
    </motion.div>
  );
}
