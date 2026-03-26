import React, { useState } from "react";
import ProductImg from "./ProductImg";

// ===================Main product gallery ====================
const ProductGallery = ({ productImg }) => {

    // first image default(Main image too)
    const [mainImage, setMainImage] = useState(productImg[0]);

    return (
        <div className="flex flex-row md:flex-col gap-4">
            {/* Ek image jo by default show karega  */}
            {/* Main Image */}
            <div className="flex-1">
                <img
                    src={mainImage}
                    alt="product"
                    className="w-full max-w-lg h-auto object-contain rounded-lg shadow"
                />
            </div>
            {/* Thumbnails */}
            <ProductImg productImg={productImg} mainImage={mainImage} setMainImage={setMainImage} />

            {/* Thumbnails */}
            {/* <div className="flex md:flex-row gap-2">
                {productImg.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt="product"
                        onClick={() => setMainImage(img)}
                        className={`w-20 h-20 object-cover border rounded cursor-pointer hover:scale-105 transition ${mainImage === img ? "border-blue-500" : "border-gray-300"}`}
                    />
                ))}
            </div> */}



        </div>
    );
};

export default ProductGallery;