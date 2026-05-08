import React, { useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ImagePlus, X, ArrowLeft } from 'lucide-react'
import { createReviewsService, } from '../review.service'


/*
    Axios automatically form-data bhejega.(useformData)
*/
const AddReview = () => {
    const navigate = useNavigate();

    /* 
        Set previewimage(only preview) and imagefile(actual file) 
        const [image, setImage] = useState(null);
        const handleImage = (e) => {
            const file = e.target.files[0]
            if (file) setImage(URL.createObjectURL(file))
        }
    */

    const [message, setMessage] = useState('')

    const [review, setReview] = useState({
        name: "",
        title: "",
        comment: "",
        rating: 0,

    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setReview({
            ...review,
            [name]: value
        })
    }

    const [hovered, setHovered] = useState(0);

    // Ref ka matlab → kisi DOM element ko pakadna.
    const fileRef = useRef();

    const user = useParams();
    // console.log("Productid id ", user.productId);

    /*
        const {productId}=usePrams();

    */

    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const handleImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setImageFile(file);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            // Use form data to handleForm 
            const formData = new FormData();
            console.log("Form data is ", formData);
            formData.append("name", review.name)
            formData.append("title", review.title)
            formData.append("comment", review.comment)
            formData.append("rating", review.rating);

            console.log("Formadta", formData);
            if (imageFile) {
                formData.append("images", imageFile);
            }

            // Service call to make review 
            const res = await createReviewsService(user.productId, formData);
            console.log("response is ", res);

            setMessage(res.message || "Review submitted Successfully ✅");

            setTimeout(() => {
                navigate(-1)
            }, 1500);


        } catch (error) {
            throw new Error("Error in creating ", error);

        }

    }


    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-md overflow-hidden">

                {/* Header */}
                <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <div>
                        <p className="text-[10px] tracking-widest uppercase text-gray-400">Share your thoughts</p>
                        <h2 className="text-lg font-semibold text-gray-800">Write a Review</h2>
                    </div>
                </div>

                <div className="px-6 py-5 flex flex-col gap-5">

                    {/* Star Rating */}
                    <div>
                        <label className="block text-[11px] tracking-widest uppercase text-gray-400 mb-2">Rating</label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(star => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setReview((prev) => ({ ...prev, rating: star }))}
                                    onMouseEnter={() => setHovered(star)}
                                    onMouseLeave={() => setHovered(0)}
                                    className="transition-transform hover:scale-110"
                                >
                                    <svg width="26" height="26" viewBox="0 0 24 24"
                                        fill={(hovered || review.rating) >= star ? '#FBBF24' : 'none'}
                                        stroke={(hovered || review.rating) >= star ? '#FBBF24' : '#D1D5DB'}
                                        strokeWidth="1.5">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-[11px] tracking-widest uppercase text-gray-600 mb-2">
                            Photo <span className="normal-case tracking-normal text-gray-300">(optional)</span>
                        </label>
                        {previewImage ? (
                            <div className="relative rounded-xl overflow-hidden h-40 bg-gray-100">
                                <img src={previewImage} alt="preview" className="w-full h-full object-cover" />

                                {/* Cross button to deselect the image  */}
                                <button
                                    onClick={() => { setPreviewImage(null); fileRef.current.value = '' }}
                                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition-colors"
                                >
                                    <X size={13} className="text-gray-600" />
                                </button>
                            </div>
                        ) : (

                            // Button ka refrence input file ko de rehe hai 
                            <button
                                type="button"
                                onClick={() => fileRef.current.click()}
                                className="w-full h-32 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-gray-300 hover:bg-gray-50 transition-all"
                            >
                                <ImagePlus size={35} className="text-blue-300" />
                                <span className="text-xs">Click to upload</span>
                            </button>
                        )}


                        {/* 
                            input dikhega nahi, but kaam karega. 
                            button refrence hai means button pe click ke baad show karega
                            file normally --click karte hai to dialogue open hota hai 

                        */}
                        <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} className="hidden" />
                    </div>

                    {/* Name of Product */}
                    <div>
                        <label className="block text-[11px] tracking-widest uppercase text-gray-400 mb-2">Name of Product</label>
                        <input
                            type="text"
                            name='name'
                            value={review.name}
                            onChange={handleChange}
                            placeholder="Name of the Product...."
                            className="w-full px-4 py-3 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl placeholder-gray-300 focus:outline-none focus:border-gray-400 focus:bg-white transition-all"
                        />
                    </div>

                    {/* Title of review  */}
                    <div>
                        <label className="block text-[11px] tracking-widest uppercase text-gray-400 mb-2">Title of Review</label>
                        <input
                            type="text"
                            name='title'
                            value={review.title}
                            onChange={handleChange}
                            placeholder="Summarise your experience…"
                            className="w-full px-4 py-3 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl placeholder-gray-300 focus:outline-none focus:border-gray-400 focus:bg-white transition-all"
                        />
                    </div>

                    {/* Comment */}
                    <div>
                        <label className="block text-[11px] tracking-widest uppercase text-gray-400 mb-2">Comment</label>
                        <textarea
                            value={review.comment}
                            name='comment'
                            onChange={handleChange}
                            placeholder="Tell others what you think…"
                            rows={4}
                            className="w-full px-4 py-3 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl placeholder-gray-300 focus:outline-none focus:border-gray-400 focus:bg-white transition-all resize-none"
                        />
                    </div>

                    {message && (
                        <p className="text-green-500 text-sm text-center">{message}</p>
                    )}

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        disabled={!review.title || !review.comment || !review.rating || !review.name}
                        className="w-full py-3 rounded-xl bg-gray-800 text-white text-xs tracking-widest uppercase hover:bg-gray-700 active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        Submit Review
                    </button>

                </div>
            </div>
        </div>
    )
}

export default AddReview