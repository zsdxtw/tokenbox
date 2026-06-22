import { useParams, Link } from "react-router-dom";
import { Star, MapPin, Calendar, Package, TrendingUp, ShieldCheck, ChevronRight, Award } from "lucide-react";
import EquipmentCard from "@/components/EquipmentCard";
import { sellers } from "@/data/platform";
import { equipmentList } from "@/data/equipment";

export default function Store() {
  const { id } = useParams();
  const seller = sellers.find((s) => s.id === id) || sellers[0];
  const sellerEquipment = equipmentList.filter((e) => e.sellerId === seller.id);

  return (
    <div className="bg-ink-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-ink-100">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-xs text-ink-500">
            <Link to="/" className="hover:text-cyan-600">首页</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-ink-900">{seller.name}</span>
          </div>
        </div>
      </div>

      {/* Store header */}
      <div className="bg-ink-900 text-white">
        <div className="absolute inset-0 bg-grid-dark opacity-50" />
        <div className="container relative py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Logo */}
            <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center font-serif text-2xl font-bold text-ink-900 shrink-0">
              {seller.name.slice(0, 2)}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-serif text-2xl font-bold">{seller.name}</h1>
                <span className="px-2 py-0.5 text-[10px] bg-cyan-400/20 text-cyan-300 rounded border border-cyan-400/30">
                  {seller.type}
                </span>
              </div>
              <p className="text-sm text-ink-400 leading-relaxed max-w-2xl">{seller.description}</p>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-ink-400">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {seller.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  入驻时间 {seller.established}
                </span>
                <span className="flex items-center gap-1">
                  <Package className="h-3.5 w-3.5" />
                  {seller.productCount} 件在售商品
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm font-medium bg-cyan-500 hover:bg-cyan-400 text-ink-900 rounded-md transition-colors">
                关注店铺
              </button>
              <button className="px-4 py-2 text-sm font-medium border border-ink-600 hover:border-cyan-400 text-white rounded-md transition-colors">
                联系卖家
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <section className="bg-white border-b border-ink-100">
        <div className="container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center gap-1 text-xs text-ink-500 mb-1">
                <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                信用评级
              </div>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={
                      s <= seller.creditRating
                        ? "h-4 w-4 text-amber-400 fill-amber-400"
                        : "h-4 w-4 text-ink-200"
                    }
                  />
                ))}
                <span className="ml-1 font-mono text-sm font-bold text-ink-900">
                  {seller.creditRating}.0
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs text-ink-500 mb-1">
                <TrendingUp className="h-3 w-3" />
                累计成交
              </div>
              <div className="font-mono text-lg font-bold text-ink-900">
                {seller.transactionCount.toLocaleString()}
                <span className="text-xs text-ink-500 font-sans ml-1">单</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs text-ink-500 mb-1">
                <Package className="h-3 w-3" />
                累计成交额
              </div>
              <div className="font-mono text-lg font-bold text-ink-900">
                ¥{(seller.totalAmount / 100000000).toFixed(2)}
                <span className="text-xs text-ink-500 font-sans ml-1">亿</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs text-ink-500 mb-1">
                <Award className="h-3 w-3" />
                在售商品
              </div>
              <div className="font-mono text-lg font-bold text-ink-900">
                {seller.productCount}
                <span className="text-xs text-ink-500 font-sans ml-1">件</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="container py-8">
        <div className="bg-white rounded-xl border border-ink-200 p-6">
          <h3 className="font-serif text-base font-bold text-ink-900 mb-4">资质认证</h3>
          <div className="flex flex-wrap gap-3">
            {seller.certifications.map((cert) => (
              <div
                key={cert}
                className="flex items-center gap-2 px-3 py-2 bg-cyan-50 border border-cyan-100 rounded-lg"
              >
                <ShieldCheck className="h-4 w-4 text-cyan-600" />
                <span className="text-sm text-cyan-800">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="container pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-xl font-bold text-ink-900">在售商品</h2>
          <span className="text-sm text-ink-500">
            共 <span className="font-mono font-semibold text-ink-900">{sellerEquipment.length}</span> 件
          </span>
        </div>

        {sellerEquipment.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {sellerEquipment.map((eq) => (
              <EquipmentCard key={eq.id} equipment={eq} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-ink-200 p-16 text-center">
            <Package className="h-10 w-10 text-ink-300 mx-auto mb-3" />
            <p className="text-sm text-ink-500">该店铺暂无在售商品</p>
            <Link
              to="/market"
              className="mt-4 inline-block text-sm text-cyan-600 hover:text-cyan-700"
            >
              浏览全部设备市场
            </Link>
          </div>
        )}
      </section>

      {/* Other sellers */}
      <section className="bg-white border-t border-ink-100">
        <div className="container py-12">
          <h2 className="font-serif text-xl font-bold text-ink-900 mb-6">其他推荐卖家</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sellers
              .filter((s) => s.id !== seller.id)
              .slice(0, 3)
              .map((s) => (
                <Link
                  key={s.id}
                  to={`/store/${s.id}`}
                  className="flex items-center gap-4 p-4 bg-ink-50 rounded-xl hover:bg-cyan-50/50 transition-colors"
                >
                  <div className="h-12 w-12 rounded-lg bg-ink-900 flex items-center justify-center text-white font-serif font-bold shrink-0">
                    {s.name.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-ink-900 truncate">{s.name}</div>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={
                            star <= s.creditRating
                              ? "h-2.5 w-2.5 text-amber-400 fill-amber-400"
                              : "h-2.5 w-2.5 text-ink-200"
                          }
                        />
                      ))}
                      <span className="ml-1 text-xs text-ink-500">{s.creditRating}.0</span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-ink-400" />
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
