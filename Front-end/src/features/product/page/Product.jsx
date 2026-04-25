import React from 'react'
import { useParams } from 'react-router-dom'
import ProductGallery from '../components/ProductGallery';
import AddCartButton from '../components/AddCartButton';
import BuyNowButton from '../components/BuyNowButton';
import Rating from '../../../components/Rating';
import { IndianRupee, } from 'lucide-react';
import ReviewProduct from '../components/ReviewProduct';
import LoadingSpinner from '../../../components/LodingSpinner';
import ErrorMessage from '../../../components/ErrorMessage';

import { useProductId } from '../product.hook';
// import { useProducts } from '../product.hook';


const ProductDetails = ({ product, reviews }) => {
    return (
        <>
            {/* Category badge */}
            <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
                    {product.subCategory.name || product.category.name}
                </span>
                {product.section && (
                    <span className="text-xs font-semibold uppercase tracking-wider bg-orange-50 text-orange-500 px-2.5 py-1 rounded-full">
                        {product.section}
                    </span>
                )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">{product.title}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
                <Rating rating={product.rating} />
                <span className="text-sm text-gray-500">
                    ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                </span>
            </div>

            {/* Divider */}
            <hr className="border-gray-100" />

            {/* Price */}
            <div className="flex items-end gap-4">
                <div className="flex items-center gap-1 text-gray-900 font-bold text-3xl">
                    <IndianRupee size={22} />
                    {product.price?.toLocaleString('en-IN')}
                </div>
                <div className="flex line-through items-center gap-1 text-gray-400 font-medium text-lg mb-0.5">
                    <IndianRupee size={16} />
                    {product.oldPrice?.toLocaleString('en-IN')}
                </div>
                {product.oldPrice && (
                    <span className="mb-0.5 text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                        {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% off
                    </span>
                )}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <p className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {product.stock > 0 ? `In Stock (${product.stock} left)` : "Out of Stock"}
                </p>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{product.description}</p>

            {/* Features */}
            <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">Key Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-blue-500 mt-0.5 flex-shrink-0">✓</span>
                            {f}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
const TrustBadges = () => {
    return (
        <div className="flex items-center justify-around pt-2 border-t border-gray-100">
            <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-lg">🔒</span>
                <span className="text-xs text-gray-500">Secure Payment</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-lg">✅</span>
                <span className="text-xs text-gray-500">100% Genuine</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-lg">💬</span>
                <span className="text-xs text-gray-500">24/7 Support</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-lg">🏷️</span>
                <span className="text-xs text-gray-500">Best Price</span>
            </div>
        </div>
    )
}

const DeliveryDetails = () => {
    return (
        <div className="flex flex-col gap-2 text-sm text-gray-600 border border-dashed border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-2">
                <span>🚚</span>
                <span className="font-medium">Free Delivery</span>
                <span className="text-gray-400">within 3-5 business days</span>
            </div>
            <div className="flex items-center gap-2">
                <span>🔄</span>
                <span className="font-medium">10-Day Returns</span>
                <span className="text-gray-400">hassle-free return policy</span>
            </div>
            <div className="flex items-center gap-2">
                <span>🛡️</span>
                <span className="font-medium">1 Year Warranty</span>
                <span className="text-gray-400">manufacturer warranty included</span>
            </div>
        </div>
    )
}

const ProductHeightlight = ({ product }) => {
    return (
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Product Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Category</span>
                    <span className="text-sm text-gray-700 font-medium">{product.category.name}</span>
                </div>
                {product.subCategory && (
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Sub-Category</span>
                        <span className="text-sm text-gray-700 font-medium">{product.subCategory.name}</span>
                    </div>
                )}
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Availability</span>
                    <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {product.stock > 0 ? 'Available' : 'Out of Stock'}
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Rating</span>
                    <span className="text-sm text-gray-700 font-medium">{product.rating} / 5.0</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Total Reviews</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">You Save</span>
                    <span className="text-sm text-green-600 font-bold">
                        ₹{(product.oldPrice - product.price).toLocaleString('en-IN')}
                    </span>
                </div>
            </div>
        </div>
    )
}


const Product = () => {

    const { productId } = useParams();
    console.log("Id from the Useparams ", productId);

    const { loading, product, error } = useProductId(productId);
    console.log("Product is from product comp ", product);

    // Find review from the Product (product id se review fetch karo )

    const reviews = product?.reviews || [];

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
                <ErrorMessage message={error} />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
                <ErrorMessage message="Product not found." />
            </div>
        );
    }

    return (
        <div className='max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-10'>

            {/* ==================Breadcrumb Navigation============== */}
            <nav className="flex items-center gap-2 text-sm text-gray-500">
                <a href="/" className="hover:text-gray-800 transition-colors">Home</a>
                <span>/</span>
                <a href="/products" className="hover:text-gray-800 transition-colors">{product.category.name}</a>
                <span>/</span>
                <span className="text-gray-800 font-medium truncate max-w-[200px]">{product.title}</span>
            </nav>

            {/* ==================Prodcut Section============== */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                {/* Gallery */}
                <div className="w-full lg:w-1/2">
                    <ProductGallery productImg={product.images} />
                </div>

                {/* Product Details */}
                <div className="w-full lg:w-1/2 flex flex-col gap-5">

                    <ProductDetails product={product} reviews={reviews} />



                    {/* Delivery details Calculate accordingly  */}
                    <DeliveryDetails />


                    {/* Product action button ------ */}
                    <div className='flex flex-col sm:flex-row gap-3'>
                        {/* Buttons */}
                        <AddCartButton
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-white border-2 border-gray-800 text-gray-800 font-semibold rounded-xl hover:bg-gray-800 hover:text-white transition-all duration-200 text-sm sm:text-base"
                            product={product}
                        >Add to cart</AddCartButton>


                        <BuyNowButton className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-blue-600 text-black font-semibold rounded-xl hover:bg-blue-700 active:scale-95 transition-all duration-200 text-sm sm:text-base shadow-lg shadow-blue-200">
                            Buy now
                        </BuyNowButton>
                    </div>

                    {/* Trust badges */}
                    <TrustBadges />


                </div>
            </div>

            <br className='text-gray-100 ' />

            {/* ==================Product Highlights / Specs Section============== */}
            <ProductHeightlight product={product} />



            {/*

             Review section with image
            ->Review like and dislike bhi add karna chiye
            ->Show review of product here show need to fetch the details  

            */}
            <ReviewProduct productId={productId} />


            {/* Recommended section of the products  */}
            <div>
                {/* <ProductCard  /> */}
            </div>

        </div>

    )
}

export default Product