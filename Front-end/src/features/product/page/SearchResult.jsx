import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard';
import { useProductsFilter } from '../product.hook';

// =================Pure Search Products ===================
const SearchHeader = ({ query }) => {
    return (
        <div className=" border-b border-gray-200 px-6 md:px-12 py-4">

            {/* Title row */}
            <div className="flex items-baseline gap-4 flex-wrap">
                <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                    Results for{" "}
                    <span className="italic font-medium text-orange-600">"{query}"</span>
                </h1>

            </div>
        </div>

    )
}

const FilterOption = ({ products, query }) => {
    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;
        if (!value) {
            navigate(`/products/search?search=${query}`);
        } else {
            navigate(`/products/search?search=${query}&sort=${value}`)
        }

    }

    return (
        <div className="flex items-center justify-between mb-8 pb-5 border-b border-gray-200">
            <p className="text-sm text-gray-400 font-sans">
                Showing <span className="text-gray-700 font-medium">{products.length}</span> result{products.length !== 1 ? "s" : ""}
            </p>


            <div className="flex items-center gap-2 text-sm font-sans text-gray-500">
                <span className="text-xs uppercase tracking-wider text-gray-400">Sort by</span>

                {/*=============== Option for filter ====== */}
                <select
                    className="border border-gray-200 rounded-sm px-3 py-1.5 text-sm text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-orange-400 cursor-pointer"
                    onChange={handleChange}
                >
                    <option value="">Relevance</option>
                    <option value="-price">Price: High to Low</option>
                    <option value="price">Price: Low to High</option>
                    <option value="newProduct">Newest</option>
                </select>
            </div>
        </div>

    )
}
const SearchResult = () => {

    // ================Search results show kar sakte hai ==============
    const [searchParams] = useSearchParams();
    const query = searchParams.get("search") || "";  //query null ho sakta hai 
    const sort = searchParams.get("sort") || "";

    const { products } = useProductsFilter(query, sort);
    console.log("Product fetch is ", products);


    return (
        <div className="min-h-screen bg-gray-50">

            {/*==========Page Header ========*/}
            <SearchHeader products={products} query={query} />


            {/* ── Main Content ── */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
                {/* --if product not match show better ui */}
                {products?.length > 0 ? (
                    <>
                        {/* FilterOption ========== */}
                        <FilterOption products={products} query={query} />

                        {/* Show the Product Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.map(product => (
                                <ProductCard key={product.id} products={product} />
                            ))}
                        </div>
                    </>
                ) : (
                    /* ── Empty State ──---------- */
                    <div className="flex flex-col items-center justify-center py-28 px-6 text-center">
                        <span className="text-6xl mb-6 opacity-25 select-none">🔍</span>
                        <div className="w-10 h-0.5 bg-orange-500 mb-6" />
                        <h2 className="text-2xl font-semibold text-gray-800 tracking-tight mb-3">
                            No results for{" "}
                            <span className="italic text-orange-600">"{query}"</span>
                        </h2>
                        <p className="text-sm text-gray-400 font-sans leading-relaxed max-w-sm mb-10">
                            We couldn't find any products matching your search. Try different keywords or browse our categories below.
                        </p>

                        {/* Suggestion chips */}
                        <div className="flex flex-wrap gap-2 justify-center mb-12">
                            {["Check spelling", "Try broader terms", "Use fewer words"].map((tip) => (
                                <span
                                    key={tip}
                                    className="bg-white border border-gray-200 text-gray-500 text-xs font-sans tracking-wide px-4 py-2 rounded-sm hover:border-orange-300 hover:text-orange-600 transition-all cursor-default"
                                >
                                    {tip}
                                </span>
                            ))}
                        </div>

                        {/* Back to home CTA */}
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 bg-gray-700 text-white text-sm font-sans uppercase tracking-widest px-8 py-3 rounded-sm hover:bg-gray-900 transition-colors duration-200"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchResult
