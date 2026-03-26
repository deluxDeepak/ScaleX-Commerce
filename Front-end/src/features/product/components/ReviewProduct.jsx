import React, { useState } from "react";
import { LetterTextIcon, ThumbsUp, ThumbsDown, CheckCircle, Star } from "lucide-react";
import Rating from "../../../components/Rating";
import ProductImg from "./ProductImg";
import { useNavigate, } from "react-router-dom";
import { useReview } from "../product.hook";

const ReviewProduct = ({ productId }) => {

    const { reviews } = useReview(productId);
    const [showAll, setShowAll] = useState(false);

    const navigate = useNavigate();

    // - send product -------------------------------------------
    const handlenavigate = () => {
        navigate(`/review/add/${productId}`);
    }

    // ->Review like and dislike bhi add karna chiye 
    const [votes, setVotes] = useState({});  //like ,dislike and null 

    const handleVote = (id, type) => {
        setVotes((prev) => ({
            ...prev,
            [id]: prev[id] === type ? null : type,  // toggle karo agar same button press ho
        }));
    };

    const visibleReviews = showAll ? reviews : reviews?.slice(0, 3);

    // ===== Rating Summary Calculate karo =====
    // Total average aur per-star breakdown nikalna
    const totalReviews = reviews?.length || 0;
    const avgRating = totalReviews
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
        : 0;

    // 5 se 1 tak har star ka count nikalo
    const starCounts = [5, 4, 3, 2, 1].map((star) => ({
        star,
        count: reviews?.filter((r) => Math.round(r.rating) === star).length || 0,
    }));

    return (
        <div className="flex flex-col gap-8">

            {/* ===== Section Header ===== */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-gray-100">

                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                        Customer Reviews
                    </h2>
                    <p className="text-sm text-gray-500 mt-0.5">{totalReviews} verified reviews</p>
                </div>

                {/* ----------Write review button ------------------ */}
                <button
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-xl transition active:scale-95 shadow-sm shadow-blue-100"
                    onClick={handlenavigate}
                >
                    <LetterTextIcon size={16} />
                    Write a Review
                </button>

            </div>


            {/* ===== Rating Summary Panel ===== */}
            <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-5 flex flex-col sm:flex-row gap-6 items-center">

                {/* Big average number */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                    <span className="text-6xl font-extrabold text-gray-900 leading-none">{avgRating}</span>
                    <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                                key={s}
                                size={16}
                                className={s <= Math.round(avgRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-gray-500">out of 5</span>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px h-24 bg-blue-100" />

                {/* Star breakdown bars */}
                <div className="flex flex-col gap-2 w-full">
                    {starCounts.map(({ star, count }) => {
                        const pct = totalReviews ? Math.round((count / totalReviews) * 100) : 0;
                        return (
                            <div key={star} className="flex items-center gap-3">
                                <span className="text-xs font-semibold text-gray-600 w-4 shrink-0">{star}</span>
                                <Star size={12} className="text-yellow-400 fill-yellow-400 shrink-0" />
                                {/* Progress bar */}
                                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                                        style={{ width: `${pct}%` }}
                                    />
                                </div>
                                <span className="text-xs text-gray-400 w-8 text-right shrink-0">{count}</span>
                            </div>
                        );
                    })}
                </div>

            </div>


            {/* ===== Individual Review Cards ===== */}
            <div className="flex flex-col gap-4">

                {visibleReviews?.map((review) => (

                    <div
                        key={review.id}
                        className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
                    >

                        {/* Top row: Avatar + Name + Verified + Rating */}
                        <div className="flex items-start justify-between gap-3">

                            <div className="flex items-center gap-3">

                                {/* Profile Avatar with gradient */}
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                                    {review.name?.charAt(0).toUpperCase()}
                                </div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-semibold text-gray-800 text-sm">
                                            {review.name}
                                        </h4>
                                        {/* Verified buyer badge */}
                                        <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
                                            <CheckCircle size={12} className="fill-green-100" />
                                            Verified
                                        </span>
                                    </div>
                                    {/* Review date */}
                                    {review.date && (
                                        <p className="text-xs text-gray-400">{review.date}</p>
                                    )}
                                </div>

                            </div>

                            <Rating rating={review.rating} />

                        </div>

                        {/* Main Comment - bold title */}
                        <p className="text-gray-900 font-semibold text-sm md:text-base leading-snug">
                            {review.comment}
                        </p>

                        {/* Full Description */}
                        {review.description && (
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {review.description}
                            </p>
                        )}

                        {/* Review Images */}
                        {review.reviewImages && review.reviewImages.length > 0 && (
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                                <ProductImg productImg={review.reviewImages} />
                            </div>
                        )}

                        {/* Divider */}
                        <hr className="border-gray-100" />

                        {/* Like / Dislike footer row */}
                        {/* ->Review like and dislike bhi add karna chiye  */}
                        <div className="flex items-center justify-between">

                            <p className="text-xs text-gray-400">Helpful?</p>

                            <div className="flex items-center gap-2">

                                {/* Thumbs Up */}
                                <button
                                    onClick={() => handleVote(review.id, "up")}
                                    className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all
                                        ${votes[review.id] === "up"
                                            ? "bg-green-50 border-green-200 text-green-600"
                                            : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                                        }`}
                                >
                                    <ThumbsUp size={13} />
                                    Yes {votes[review.id] === "up" && "· Thanks!"}
                                </button>

                                {/* Thumbs Down */}
                                <button
                                    onClick={() => handleVote(review.id, "down")}
                                    className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all
                                        ${votes[review.id] === "down"
                                            ? "bg-red-50 border-red-200 text-red-500"
                                            : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                                        }`}
                                >
                                    <ThumbsDown size={13} />
                                    No
                                </button>

                            </div>
                        </div>

                    </div>

                ))}

            </div>


            {/* Show More Button */}
            {reviews?.length > 3 && (
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="self-center px-6 py-2.5 text-sm font-semibold text-blue-600 border-2 border-blue-100 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all active:scale-95"
                >
                    {showAll ? "↑ Show Less" : `Show All ${reviews.length} Reviews →`}
                </button>
            )}

        </div>
    );
};

export default ReviewProduct;