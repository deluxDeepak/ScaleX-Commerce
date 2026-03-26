import React from "react";

const ProductImg = ({ productImg = [], mainImage, setMainImage }) => {
    const handleClick = (img) => {
        if (setMainImage) setMainImage(img);
    };

    if (!productImg.length) return null;

    return (
        <div className="flex md:flex-row gap-2">
            {productImg.map((img, index) => {
                const isActive = mainImage === img;
                return (
                    <img
                        key={index}
                        src={img}
                        alt="product"
                        onClick={() => handleClick(img)}
                        className={`w-20 h-20 object-cover border rounded cursor-pointer hover:scale-105 transition ${isActive ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300"}`}
                    />
                );
            })}
        </div>
    );
};

export default ProductImg;
