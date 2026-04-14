import React, { useEffect, useState } from 'react'
import Searchbar from './Searchbar';

import { User, Heart, ShoppingCart, ChevronDown, Menu, X, User2 } from 'lucide-react';
import logo from '../assets/icons/logo.png'
import { useNavigate } from 'react-router-dom';

import { useCart } from '../context/CartContext';
import { getProductSuggestionservice } from '../features/product/product.service';
import { useAuth } from '../context/useAuth';
import { getInitials } from '../utils/getInitialName';


// products-category 
// - products section after before searching 
const ShowSuggestion = ({ suggestions, showSuggestion, onSelect }) => {

    const [scrollbar, setScrollbar] = useState(false);


    /*
        Never call setState during render
        if (suggestions.length > 10) {
            setScrollbar(true);
        }
    */
    useEffect(() => {
        if (suggestions.length > 10) {
            setScrollbar(true);
        } else {
            setScrollbar(false);
        }

    }, [suggestions]);

    if (!showSuggestion || suggestions.length === 0) return null;
    console.log("Suggestion is ", suggestions);

    // If product suggestions is greater than 10-15 then give scrollbar 
    return (
        <div
            className={`absolute top-full left-0 w-full bg-white rounded-md shadow-lg z-50 ${scrollbar ? "max-h-50 lg:max-h-60 overflow-y-auto" : ""}`}
        >

            <div>

                {suggestions.map((item) => (
                    <div
                        key={item.id}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm hover:text-blue-500 hover:underline"
                        onClick={() => onSelect(item)}
                    >
                        <img src="" alt="" />
                        <h3>{item.title}</h3>
                    </div>
                ))}
            </div>

        </div>
    );
};

// Mainlayout -->render karenge 
const StoreHeader = () => {
    const navigate = useNavigate();

    // suppose header me kya search kar rehe hai 
    // Ye sirf header input state hai.
    const [search, setSearch] = useState("");
    //isko searchresult me use karna hai 
    const onChange = (e) => {
        setSearch(e.target.value);
    }

    // Recommendation and debouncing =======================
    const [debounceValue, setDebounceValue] = useState("");

    // Show suggestion on same screen ===============
    // (Suggestion screen open karna parega )
    const [suggestions, setsuggestions] = useState([]);
    const [showSuggestion, setShowSuggestion] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(search)

        }, 500);

        console.log("timer is ", timer);
        return () => clearTimeout(timer);
    })
    console.log("Debounce value is ", debounceValue);



    useEffect(() => {

        if (!debounceValue || !debounceValue.trim()) {
            setsuggestions([]);
            setShowSuggestion(false);
            return;
        }

        const fetchProduct = async () => {

            try {

                const res = await getProductSuggestionservice(debounceValue);
                console.log("Response is ", res);
                setsuggestions(res.products);

                setShowSuggestion(res.products.length > 0);

            } catch (err) {
                console.log(err);
                setShowSuggestion(false);
            }
        };

        fetchProduct();

    }, [debounceValue]);


    // Yehan se api call kar sakte hai --best way hai header sirf input hai 
    const onSearch = () => {
        console.log("Search value is ", search);

        // Header only input dega (Api call page ko hi karna chiye )
        // Clear the search value 
        if (!search.trim()) return
        navigate(`/products/search?search=${search}`)

        setSearch("");
    }



    // Mobile menu toggle
    const [mobileOpen, setMobileOpen] = useState(false);

    // update the cart count here  and get user also to show the profile 
    const { countCart } = useCart();
    const cartCount = countCart || 0
    // Profile ke jagah light db call use kar sakte hai jaise login karte time hi profileme from auth se lennge 
    // const { userProfiles } = useProfile(); 
    // console.log("Userprofile header is ", userProfiles);
    const { user } = useAuth();




    // Navigate to correct pages 
    const handleNavigateLogin = () => {
        navigate("/auth/login");
    }
    const handleNavigateCart = () => {
        navigate("/user/cart/product");
    }
    const handleNavigateWishlist = () => {
        navigate("/user/wishlist/product");
    }
    const handleNavigateUser = () => {
        navigate("/user/dashboard");
    }

    return (
        <header className="bg-white w-full shadow-sm sticky top-0 z-50 border-b border-gray-100">

            {/* ===== Top announcement bar ===== */}
            {/* <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-medium py-1.5 text-center tracking-wide">
                🚀 Free delivery on orders above ₹499 &nbsp;·&nbsp; 10-Day easy returns
            </div> */}

            {/* ===== Main Header Row ===== */}
            <div className="max-w-7xl mx-auto px-2 lg:px-4 sm:px-6 py-3 flex items-center justify-between gap-4">

                {/* Logo and Title */}
                <div
                    className="flex items-center gap-2 cursor-pointer shrink-0"
                    onClick={() => navigate("/")}
                >
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-md shadow-blue-100">
                        <img src={logo} alt="Shopify Logo" className="h-5 w-5 object-contain brightness-0 invert" />
                    </div>
                    <div className="flex flex-col leading-tight">
                        <h1 className="text-lg font-extrabold text-gray-900 tracking-tight leading-none">Shopify</h1>
                        <span className="text-[10px] text-blue-500 font-semibold tracking-widest uppercase">Store</span>
                    </div>
                </div>



                {/* Searchbar — center */}
                <div className="hidden sm:flex flex-1 max-w-xl mx-4 relative">

                    <Searchbar
                        value={search}
                        placeholder={"Search for products, brands & more..."}
                        onChange={onChange}
                        onSearch={onSearch}
                    />

                    <ShowSuggestion
                        showSuggestion={showSuggestion}
                        suggestions={suggestions}

                        // Original products section navigate kara denge (Productfind jaisa lagega )
                        onSelect={(item) => {
                            navigate(`/products/${item._id}`);
                            setSearch("")
                            setShowSuggestion(false);
                        }}
                    />

                </div>

                {/* Icons — right side */}
                <div className="flex items-center gap-1 shrink-0">

                    {/* Wishlist */}
                    <button
                        className="hidden sm:flex p-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
                        onClick={handleNavigateWishlist}
                        aria-label="Wishlist"
                    >
                        <Heart size={20} className="text-gray-500 group-hover:text-red-500 transition-colors" />
                    </button>

                    {/* Cart with count badge */}
                    <div className="relative hidden sm:flex">
                        <button
                            onClick={handleNavigateCart}
                            className="flex items-center gap-1.5 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
                            aria-label="Cart"
                        >
                            <ShoppingCart size={20} className="text-gray-500 group-hover:text-blue-600 transition-colors" />
                            {/* update the cart count here */}
                            {cartCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-sm">
                                    {cartCount > 99 ? "99+" : cartCount}
                                </span>
                            )}
                        </button>
                    </div>

                    {user ? (
                        <button
                            onClick={handleNavigateUser}
                            aria-label="Profile"
                            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors group"
                        >
                            {/* Avatar */}
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-sm">

                                {user.profileImg ? (
                                    <img
                                        src={user.profileImg}
                                        alt="profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-white text-sm font-semibold">
                                        {getInitials(user.name)}
                                    </span>
                                )}

                            </div>

                            {/* Text */}
                            <span className="hidden md:block text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                                Account
                            </span>

                            <ChevronDown size={14} className="hidden md:block text-gray-400" />
                        </button>
                    ) : (
                        <button
                            className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors"
                            onClick={handleNavigateLogin}

                        >
                            <User2 className="text-gray-600" />
                            <span className="text-sm font-medium">Login</span>
                        </button>
                    )}


                    {/* Mobile menu toggle */}
                    <button
                        className="sm:hidden p-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Menu"
                    >
                        {mobileOpen ? <X size={20} className="text-gray-600" /> : <Menu size={20} className="text-gray-600" />}
                    </button>

                </div>
            </div>

            {/* ===== Mobile Search Row ===== */}
            <div className="sm:hidden px-4 pb-3 relative">
                <Searchbar
                    value={search}
                    placeholder={"Search products..."}
                    onChange={onChange}
                    onSearch={onSearch}
                />

                <ShowSuggestion
                    showSuggestion={showSuggestion}
                    suggestions={suggestions}
                    onSelect={(item) => {
                        navigate(`/product/${item._id}`);
                        setShowSuggestion(false);
                        setSearch("")
                    }}
                />
            </div>

            {/* ===== Mobile Dropdown Menu ===== */}
            {mobileOpen && (
                <div className="sm:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1">
                    <button
                        className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors"
                        onClick={() => { setMobileOpen(false); }}
                    >
                        <Heart size={18} className="text-red-400" /> Wishlist
                    </button>
                    <button
                        className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors"
                        onClick={() => { handleNavigateCart(); setMobileOpen(false); }}
                    >
                        <ShoppingCart size={18} className="text-blue-500" /> Cart
                        {cartCount > 0 && (
                            <span className="ml-auto bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-0.5">{cartCount}</span>
                        )}
                    </button>
                    <button
                        className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors"
                        onClick={() => setMobileOpen(false)}
                    >
                        <User size={18} className="text-indigo-500" /> Account
                    </button>
                </div>
            )}

        </header>
    );
}

export default StoreHeader