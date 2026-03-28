import React from 'react'
import { Link } from 'react-router-dom'
import { category5 } from '../../../assets'
// import { products } from '../../product/data/products'
// import { category } from '../../product/data/category'
import ProductCard from '../../product/components/ProductCard'
import { useProduct } from '../../../context/useProduct'
import { useCategory } from '../../../context/useCategory'

// Store home Page Main content render by outlet in Mainlayout
const StoreHeader = () => {
    return (

        <section className="relative w-full min-h-[520px] md:min-h-[580px] overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">

            {/* Decorative background circles */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600 opacity-20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500 opacity-20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-800 opacity-10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-10 h-full">

                {/* Hero Text */}
                <div className="flex-1 flex flex-col gap-6 max-w-xl">

                    {/* Badge */}
                    <span className="inline-flex items-center gap-2 w-max bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                        New Season Sale — Up to 50% Off
                    </span>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                        Shop the
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                            Latest Trends
                        </span>
                        in Style
                    </h1>

                    <p className="text-blue-200 text-base md:text-lg leading-relaxed max-w-md">
                        Discover curated collections in Fashion, Electronics & more. Fast delivery, easy returns — everything you love, all in one place.
                    </p>

                    {/* Stats row */}
                    <div className="flex gap-6 py-2">
                        {[
                            { value: "50K+", label: "Products" },
                            { value: "4.9★", label: "Avg Rating" },
                            { value: "2-Day", label: "Delivery" },
                        ].map((s) => (
                            <div key={s.label} className="flex flex-col">
                                <span className="text-white font-bold text-lg">{s.value}</span>
                                <span className="text-blue-400 text-xs">{s.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className='flex gap-4 flex-wrap'>
                        <a href="#new-arrival" className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-200 active:scale-95">
                            Shop Now →
                        </a>
                        <a href="#products" className="inline-flex items-center gap-2 text-white border border-white/30 hover:border-white/60 hover:bg-white/10 font-semibold px-7 py-3.5 rounded-xl transition-all duration-200">
                            View All
                        </a>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="flex-1 flex justify-center md:justify-end items-center">
                    <div className="relative">
                        {/* Glow ring */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-400 opacity-30 blur-xl scale-105" />
                        <img
                            src={category5}
                            alt="Home Hero"
                            className="relative w-[260px] md:w-[340px] lg:w-[400px] h-auto rounded-2xl shadow-2xl object-cover border-2 border-white/20"
                        />
                        {/* Floating badge on image */}
                        <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl px-4 py-2.5 flex items-center gap-2">
                            <span className="text-xl">🔥</span>
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Flash Sale</p>
                                <p className="text-sm font-bold text-gray-800">Ends in 2h 30m</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </section>

    )
}

const TrustBar = () => {
    return (
        <section className="max-w-6xl mx-auto w-full px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { icon: "🚚", title: "Free Delivery", sub: "On orders above ₹499" },
                    { icon: "🔄", title: "Easy Returns", sub: "10-day return policy" },
                    { icon: "🛡️", title: "Secure Payment", sub: "100% safe checkout" },
                    { icon: "🎁", title: "Exclusive Offers", sub: "Daily deals & discounts" },
                ].map((item) => (
                    <div key={item.title} className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3.5 hover:shadow-md transition-shadow">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                            <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                            <p className="text-xs text-gray-500">{item.sub}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

const CategoryShow = ({ category }) => {
    const originalStrt =
    {
        id: 1,
        name: "Clothes",
        // img: category1,
        icons: "images of icon ",
        slug: "/products/clothes",
        subCategories: [
            { name: "Saree", slug: "/products/clothes/saree" },
            { name: "Lehnga", slug: "/products/clothes/lehnga" },
            { name: "Kurti", slug: "/products/clothes/kurti" },
            { name: "Shirts", slug: "/products/clothes/shirts" },
            { name: "T-Shirts", slug: "/products/clothes/tshirts" },
            { name: "Jeans", slug: "/products/clothes/jeans" }
        ]
    }
    return (
        <section className="w-full max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-1">Explore</p>
                    <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
                </div>
                <Link to="/products" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    View all <span>→</span>
                </Link>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {category.map((c) => (
                    <Link
                        key={c.id}
                        to={`/products?category=${c.name}`}
                        className="flex flex-col items-center bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 p-4 group border border-gray-100 hover:border-blue-200 hover:-translate-y-1"
                    >
                        <div className="w-full h-30 rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center mb-2.5 transition-colors">
                            <img
                                src={c.icon}
                                alt={c.name}
                                className="w-full h-20 object-contain group-hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                        <span className="text-xs font-semibold text-gray-700 group-hover:text-blue-600 capitalize text-center leading-tight transition-colors">
                            {c.name.replace('category', '')}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    )
}

const SalesBanner = () => {
    return (
        <section className="max-w-6xl mx-auto w-full px-4">
            <div className="rounded-2xl bg-gradient-to-r from-red-500 to-orange-400 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-orange-200">
                <div className="flex items-center gap-4">
                    <span className="text-4xl">⚡</span>
                    <div>
                        <h3 className="text-white font-extrabold text-xl md:text-2xl">Flash Sale — Up to 70% Off!</h3>
                        <p className="text-orange-100 text-sm">Limited time deals on top products. Don't miss out!</p>
                    </div>
                </div>
                <a href="#flash-sales" className="shrink-0 bg-white text-red-500 font-bold px-6 py-3 rounded-xl hover:bg-orange-50 transition-colors shadow text-sm">
                    Shop Flash Sale →
                </a>
            </div>
        </section>
    )
}

const NewsLetterBanner = () => {
    return (
        <section className="max-w-6xl mx-auto w-full px-4">
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div>
                    <h3 className="text-white font-extrabold text-xl md:text-2xl mb-1">Get Exclusive Deals in Your Inbox</h3>
                    <p className="text-blue-300 text-sm">Subscribe and be the first to know about sales and new arrivals.</p>
                </div>
                <div className="flex w-full md:w-auto gap-2">
                    <input
                        type="email"
                        placeholder="Your email address"
                        className="flex-1 md:w-64 px-4 py-3 rounded-xl text-sm outline-none bg-white/10 border border-white/20 text-white placeholder-blue-300 focus:border-blue-400 transition"
                    />
                    <button className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm shrink-0">
                        Subscribe
                    </button>
                </div>
            </div>
        </section>
    )
}

// products--section of products ===============
const ProductSectons = ({ products }) => {
    return (
        <section id="new-arrival" className="w-full max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-1">Just In</p>
                    <h2 className="text-2xl font-bold text-gray-900">New Arrivals</h2>
                </div>
                <Link to="/products?section=New Arrival" className="text-sm font-semibold text-blue-600 hover:text-blue-700">See all →</Link>
            </div>
            <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent pb-3">
                {products.map((p) => (
                    <div className="flex-shrink-0" key={p.id}>
                        <ProductCard products={p} />
                    </div>
                ))}
            </div>
        </section>
    )
}


const Home = () => {
    // Logic to show diffrent types of products in the Home page 
    const { products = [] } = useProduct();
    console.log("Product are from the backend", products);
    const { category = [] } = useCategory();


    const newProducts = products?.filter((p) =>
        p.sections?.includes("newArrival")
    )

    const bestSeller = products?.filter((p) =>
        p.sections?.includes("bestSeller")
    );

    const flashSales = products?.filter((p) =>
        p.sections?.includes("flashSale")
    );

    const trendingProducts = products?.filter((p) =>
        p.sections?.includes("trending")
    );



    return (
        <div className="flex flex-col gap-16 bg-gray-50 pb-16">

            {/* ===================== HERO SECTION ===================== */}
            <StoreHeader />

            {/* ===================== TRUST BAR ===================== */}
            <TrustBar />


            {/* ===================== CATEGORY SECTION ===================== */}
            <CategoryShow category={category} />


            {/* ===================== FLASH SALES BANNER ===================== */}
            <SalesBanner />


            {/* ===== Products Section - Responsive Grid */}
            <ProductSectons products={newProducts} />

            <section id="products" className="w-full max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <p className="text-xs font-semibold text-yellow-500 uppercase tracking-widest mb-1">Top Picks</p>
                        <h2 className="text-2xl font-bold text-gray-900">Best Sellers</h2>
                    </div>
                    <Link to="/products?section=Best Seller" className="text-sm font-semibold text-blue-600 hover:text-blue-700">See all →</Link>
                </div>
                <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-yellow-200 scrollbar-track-transparent pb-3">
                    {bestSeller?.map((p) => (
                        <div className="min-w-[220px] max-w-xs flex-shrink-0" key={p.id}>
                            <ProductCard products={p} />
                        </div>
                    ))}
                </div>
            </section>


            <section id="flash-sales" className="w-full max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <p className="text-xs font-semibold text-red-500 uppercase tracking-widest mb-1">⚡ Limited Time</p>
                        <h2 className="text-2xl font-bold text-gray-900">Flash Sales</h2>
                    </div>
                    <Link to="/products?section=Flash Sales" className="text-sm font-semibold text-red-500 hover:text-red-600">See all →</Link>
                </div>
                <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-red-200 scrollbar-track-transparent pb-3">
                    {flashSales.lenght > 0 && flashSales.map((p) => (
                        <div className="flex-shrink-0" key={p.id}>
                            <ProductCard key={p.id} products={p} />
                        </div>
                    ))}
                </div>
            </section>


            {/* ===================== TRENDING SECTION ===================== */}
            <section className="w-full max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <p className="text-xs font-semibold text-purple-500 uppercase tracking-widest mb-1">Trending Now</p>
                        <h2 className="text-2xl font-bold text-gray-900">What's Hot</h2>
                    </div>
                    <Link to="/products?section=Trending" className="text-sm font-semibold text-blue-600 hover:text-blue-700">See all →</Link>
                </div>
                <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent pb-3">
                    {trendingProducts.map((p) => (
                        <div className="flex-shrink-0" key={p.id}>
                            <ProductCard products={p} />
                        </div>
                    ))}
                </div>
            </section>


            {/* ===================== NEWSLETTER BANNER ===================== */}
            <NewsLetterBanner />

        </div>
    );
}

export default Home