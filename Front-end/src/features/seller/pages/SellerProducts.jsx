import React, { useState } from 'react'
import Button from '../../../components/ui/Button'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard';

const SellerProducts = () => {

  // Show only 10 product baki page wise show karo 
  const [showAll, setShowAll] = useState(false);


  const stockProducts = products.filter((p) => p.stock > 1);
  const outOfStockProducts = products.filter((p) => p.stock === 1 || p.stock === 0);

  const tabs = [
    { name: "All", data: products },
    { name: "In Stock", data: stockProducts },
    { name: "Out of Stock", data: outOfStockProducts }
  ]

  const [activeTab, setActiveTab] = useState("All");

  const currentProducts =
    tabs.find((t) => t.name === activeTab)?.data || [];

  const visibleProducts = showAll ? currentProducts : currentProducts.slice(0, 10);

  return (
    <div>

      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">
            Product Management
          </h1>
          <p className="text-xs text-gray-400">
            You have {products.length} listed products
          </p>
        </div>

        <Button className="bg-gray-900 text-white">
          + Add Product
        </Button>

      </header>


      {/* Tabs */}
      <div className="flex gap-2 p-4">

        {tabs.map((t) => (
          <Button
            key={t.name}
            onClick={() => setActiveTab(t.name)}
            className={
              activeTab === t.name
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600"
            }
          >
            {t.name}
          </Button>
        ))}

      </div>


      {/* Products */}
      <div className="p-4">

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