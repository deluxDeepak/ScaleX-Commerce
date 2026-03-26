import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import CategorySidebar from '../components/CategorySidebar';
import ProductCard from '../components/ProductCard';

import { useCategory } from '../../../context/useCategory';
import { useCategoryProduct } from '../product.hook';

const Category = () => {

  const [searchParams] = useSearchParams();

  // url params
  const categoryget = searchParams.get("category");
  const subCategoryget = searchParams.get("sub");


  // backend category list
  const { category } = useCategory();


  // ===== find category object =====
  const selectedCategory = category.find(
    (c) => c.name === categoryget
  );

  const categoryId = selectedCategory?._id;


  // ===== find subcategory object ==
  let subCategoryId = null;

  if (selectedCategory && subCategoryget) {

    const sub = selectedCategory.subCategories.find(
      (s) => s.name === subCategoryget
    );

    subCategoryId = sub?._id;
  }
  // ===== hook call =====
  const { products, subProducts, loading } =
    useCategoryProduct(categoryId, subCategoryId);

  console.log("Products subcategory", subProducts);


  return (
    <div className="sm:px-4 py-6 md:py-4">

      <div className="flex flex-col md:flex-row gap-4">

        <aside>
          <CategorySidebar category={category} />
        </aside>

        <main className="flex-1">

          <h2>
            {categoryget
              ? `Category: ${categoryget}`
              : "All Products"}
          </h2>


          <div
            className={`grid grid-cols-4 gap-4 transition-all duration-300 ${loading ? "opacity-50" : "opacity-100"
              }`}
          >

            {loading && <p>Loading...</p>}


            {
              subCategoryId
                ? subProducts?.map((p) => (
                  <ProductCard key={p._id} products={p} />
                ))
                : products?.map((p) => (
                  <ProductCard key={p._id} products={p} />
                ))
            }

          </div>

        </main>

      </div>

    </div>
  );
};

export default Category;