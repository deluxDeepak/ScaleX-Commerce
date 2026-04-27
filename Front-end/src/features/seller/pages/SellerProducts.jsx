import React, { useState } from 'react'
import Button from '../../../components/ui/Button'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard';
import { useSellerProducts } from '../seller.hook';

const SellerProducts = () => {

  // Show only 10 product baki page wise show karo 
  const [showAll, setShowAll] = useState(false);

  const { sellerProduct, loading, error } = useSellerProducts();
  console.log("Seller product is ", sellerProduct);

  const stockProducts = sellerProduct.filter((pro) => pro.stock > 1)
  const outOfStockProducts = sellerProduct.filter((p) => p.stock === 1 || p.stock === 0);

  const tabs = [
    { name: "All", data: sellerProduct },
    { name: "In Stock", data: stockProducts },
    { name: "Out of Stock", data: outOfStockProducts }
  ]

  const [activeTab, setActiveTab] = useState("All");

  const currentProducts =
    tabs.find((t) => t.name === activeTab)?.data || [];

  const visibleProducts = showAll ? currentProducts : currentProducts.slice(0, 10);

  return (
    <div className=''>

      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-3 lg:px-8 py-2 lg:py-4 flex items-center justify-between">
        <div>
          <h1 className="test-md lg:text-lg font-bold text-gray-900">
            Product Management
          </h1>
          <p className="text-xs text-gray-400">
            You have {products.length} listed products
          </p>
        </div>

        <button className="px-2 py-2 lg:px-4 lg:py-2 rounded-xl lg:rounded-full bg-gray-900 text-white text-sm">
          Add Product
        </button>

      </header>


      {/* Tabs */}
      <div className="flex gap-2 p-2 lg:p-4">
        {tabs.map((t) => (
          <Button
            key={t.name}
            onClick={() => setActiveTab(t.name)}
            className={
              activeTab === t.name
                ? "bg-gray-900 text-white text-sm lg:text-md"
                : "bg-gray-100 text-gray-600 text-sm lg:text-md"
            }
          >
            {t.name}
          </Button>
        ))}

      </div>


      {/* Products */}
      <div className="flex flex-col gap-2 lg:gap-4">

        {visibleProducts.map((p) => (
          <ProductCard key={p.id} product={p}>

          </ProductCard>
        ))}


      </div>

      {currentProducts.length > 10 && (
        <Button
          onClick={() => setShowAll(!showAll)}
          className="bg-blue-100 text-blue-600"
        >
          {showAll ? "Show less" : "Show all"}
        </Button>
      )}

    </div>
  )
}

export default SellerProducts