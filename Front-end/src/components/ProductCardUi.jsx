import AddCartButton from "./AddCartButton";
import Rating from "../../../components/Rating";
import { useNavigate } from "react-router-dom";
import ProductPrice from "./ProductPrice";
import { useCart } from "../../../context/CartContext";
import { useState } from "react";


const ProductCardUi = ({ products }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/products/${products.id}`);
    // ye scrolling start se start karega 
    window.scrollTo(0, 0) //Same scroll se start karna hai isko jhan last tha badal denge 

  }

  // Yehan laga sakte hai add to cart 
  const { addToCart } = useCart();

  // Button animate show better ui after adding product 
  const [added, setAdded] = useState(false);  //Ye state change karna for Ui 

  // Discount percentage calculate
  const discount = products.oldPrice
    ? Math.round(((products.oldPrice - products.price) / products.oldPrice) * 100)
    : null;


  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col w-full min-w-[220px] max-w-[260px] group overflow-hidden"
    >

      {/* Product Image */}
      <div className="relative w-full h-48 bg-gray-50 overflow-hidden cursor-pointer"
        onClick={handleNavigate}
      >
        <img
          src={products.images[0]}  //Imges multiple show on main gallery
          alt={products.title}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Discount badge */}
        {discount && (
          <span className="absolute top-2.5 left-2.5 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
            -{discount}%
          </span>
        )}

        {/* Out of stock overlay */}
        {products.stock === 0 && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-gray-700 text-xs font-bold px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick view on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>

      {/* Card Body */}
      <div className="flex flex-col gap-2.5 p-4 flex-1">

        {/* Category */}
        <span className="text-xs font-semibold text-blue-500 tracking-wider uppercase">
          {products.subCategory || products.category}
        </span>

        {/* Title */}
        <h2
          onClick={handleNavigate}
          className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug cursor-pointer hover:text-blue-600 transition-colors"
        >
          {products.title}
        </h2>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <Rating rating={products.rating} />
          <span className="text-xs text-gray-400">({products.rating})</span>
        </div>

        {/* Price + Rating */}
        <div className="flex items-center gap-2 mt-auto">

          {/* Price */}
          <ProductPrice price={products.price} />
          {/* <div className="flex items-center gap-1 text-black-700 font-bold text-lg">
            <IndianRupee size={16} />
            {products.price}
          </div> */}

          {/* Old price */}
          {products.oldPrice && (
            <span className="text-xs text-gray-400 line-through">
              ₹{products.oldPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Stock indicator */}
        {products.stock > 0 && products.stock <= 5 && (
          <p className="text-xs text-orange-500 font-medium">
            ⚡ Only {products.stock} left!
          </p>
        )}

        {/* Add to cart button ko product bhej do wo add kar dega  */}
        <AddCartButton
          className={`w-full mt-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
            ${added
              ? "bg-green-50 text-green-600 border border-green-200"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-100 active:scale-95"
            }`}
          products={products}
          setAdded={setAdded}
          disabled={products.stock === 0}
        >
          {added ? "✓ Added to Cart" : "Add to Cart"}
        </AddCartButton>

      </div>
    </div>
  );
};

export default ProductCardUi;