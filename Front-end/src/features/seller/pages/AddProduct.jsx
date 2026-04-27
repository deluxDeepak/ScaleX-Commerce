import React, { useRef, useState } from "react";
import Button from "../../../components/ui/Button";
import ErrorMessage from "../../../components/ErrorMessage";
import { useCategory } from "../../../context/useCategory";
import useSubCategory from "../../../core/hooks/useSubCategory";
import { useAddProduct } from "../seller.hook";



// ---------- Product Gallery ----------

const Productgallery = ({ setImageFiles }) => {

  const ref = useRef(null);
  const [previewImages, setPreviewImages] = useState([]);

  const handleMultiple = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    const preview = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviewImages(preview);
  };

  return (

    <div className="bg-white shadow-md rounded-xl p-5 space-y-4">

      <h2 className="text-lg font-semibold border-b pb-2">
        Product Gallery
      </h2>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        onClick={() => ref.current.click()}
      >
        Upload Images
      </button>

      <input
        type="file"
        multiple
        ref={ref}
        className="hidden"
        onChange={handleMultiple}
      />

      {previewImages.length > 0 ? (

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

          {previewImages.map((img, index) => (

            <img
              key={index}
              src={img}
              alt=""
              className="w-full h-32 object-cover rounded-lg border"
            />

          ))}

        </div>

      ) : (

        <div className="text-gray-400">
          No images selected
        </div>

      )}

    </div>
  );
};



const inputFeildGeneral = [
  { name: "title", label: "Title", placeholder: "Product title" },
  { name: "description", label: "Description", placeholder: "Enter product description" },
  { name: "features", label: "Features", placeholder: "Enter product feature" },
];

// ---------- General Info ----------
const GeneralInfo = ({ handleChange, form }) => (
  <div className="bg-white shadow-md rounded-xl p-5 space-y-4">

    <h2 className="text-lg font-semibold border-b pb-2">
      General Info
    </h2>

    <div className="grid md:grid-cols-2 gap-4">

      {inputFeildGeneral.map(({ name, label, placeholder }) => (
        <div key={name} className="flex flex-col gap-1">

          <label className="text-sm font-medium">
            {label}
          </label>

          <input
            type="text"
            name={name}
            value={form[name]}
            placeholder={placeholder}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

        </div>
      ))}

    </div>

  </div>
);


// ---------- Price / Inventory ----------

const inputFeildPrice = [
  { name: "price", type: "number", label: "Price", placeholder: "Product price" },
  { name: "stock", type: "text", label: "Stock", placeholder: "Enter product in Stock" },
];

// const category = ["Mens wear", "Women wear", "Electronic"];
// const subCategory = ["Mens wear", "Women wear", "Electronic"];

const PriceInventry = ({ handleChange, form, categories, setform }) => {
  // 1.Select the category first 
  const { subCategory } = useSubCategory(form.category);
  console.log("Subcategory from component is ", subCategory);

  const handleCategoryChange = (e) => {
    const value = e.target.value

    // 3.oncategory change subCategory reset hona chiye 
    setform((prev) => ({
      ...prev,
      category: value,
      subCategory: ""
    }));

  }
  //id ke sath fetch karna parega hook bana sakte hai 
  // const { subCategory } = useCategory(); --- ye pura categories lake dega 

  return (
    <div className="bg-white shadow-md rounded-xl p-5 space-y-4">

      <h2 className="text-lg font-semibold border-b pb-2">
        Price & Inventory
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        {inputFeildPrice.map(({ name, label, placeholder, type = "text" }) => (
          <div key={name} className="flex flex-col gap-1">

            <label className="text-sm font-medium">
              {label}
            </label>

            <input
              type={type}
              name={name}
              value={form[name]}
              placeholder={placeholder}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />

          </div>
        ))}

        {/* Category */}
        <div className="flex flex-col gap-1">

          <label className="text-sm font-medium">
            Category
          </label>

          <select
            className="border rounded-lg px-3 py-2"
            name="category"
            value={form.category}   //selected cat 
            onChange={handleCategoryChange}

          >

            <option value="" >
              Select category
            </option>

            {/* Drop down  */}
            {categories?.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}

          </select>

        </div>

        {/* Subcategory */}
        <div className="flex flex-col gap-1">

          <label className="text-sm font-medium">
            SubCategory
          </label>

          <select
            className="border rounded-lg px-3 py-2"
            name="subCategory"
            value={form.subCategory}
            onChange={handleChange}
          >

            <option value="">
              Select subcategory
            </option>

            {subCategory?.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}

          </select>

        </div>

      </div>

    </div>
  )
};



// ---------- Main Page ----------

const AddProduct = () => {

  const {
    setImageFiles,
    handleChange,
    setForm,
    form,
    error,
    message,
    handleSubmit
  } = useAddProduct()

  const { category } = useCategory();

  return (

    <div className=" mx-auto p-4 space-y-6">

      <Productgallery setImageFiles={setImageFiles} />

      <GeneralInfo handleChange={handleChange} form={form} />

      <PriceInventry
        handleChange={handleChange}
        form={form}
        categories={category}
        setform={setForm}
      // subCategory={subCategory}
      />

      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <div>{message}</div>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!form.title || !form.price}
        className="w-full py-3 rounded-xl bg-gray-800 text-white text-xs tracking-widest uppercase hover:bg-gray-700 active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Add product
      </button>

    </div>
  );
};

export default AddProduct;