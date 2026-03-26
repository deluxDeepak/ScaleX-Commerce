import React, { useRef, useState } from "react";
import Button from "../../../components/ui/Button";
import { createProductService } from "../seller.service";
import ErrorMessage from "../../../components/ErrorMessage";
import { useCategory } from "../../../context/useCategory";
import useSubCategory from "../../../core/hooks/useSubCategory";


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
  { name: "price", label: "Price", placeholder: "Product price" },
  { name: "stock", label: "Stock", placeholder: "Enter product in Stock" },
];

// const category = ["Mens wear", "Women wear", "Electronic"];
// const subCategory = ["Mens wear", "Women wear", "Electronic"];

const PriceInventry = ({ handleChange, form, categories }) => {
  // 1.Select the category first 
  // 2.Then select the subCategory 
  const [selectedCategory, setSelectedCategory] = useState("");
  const { subCategory } = useSubCategory(selectedCategory);
  console.log("Subcategory from component is ", subCategory);

  const handleCategoryChange = (e) => {
    handleChange(e);  //form update 
    setSelectedCategory(e.target.value);  //sub category fetch 

    // 3.oncategory change subCategory reset hona chiye 
    handleChange({
      subCategory: {
        name: "subCategory",
        value: ""
      }
    })
  }
  //id ke sath fetch karna parega hook bana sakte hai 
  // const { subCategory } = useCategory(); --- ye pura categories lake dega 

  return (
    <div className="bg-white shadow-md rounded-xl p-5 space-y-4">

      <h2 className="text-lg font-semibold border-b pb-2">
        Price & Inventory
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        {inputFeildPrice.map(({ name, label, placeholder }) => (
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
            value={form.category}
            onChange={handleCategoryChange}

          >

            <option value="" >
              Select category
            </option>

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

            {subCategory.map((c) => (
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

  // Intial state hai 
  const state = {
    // General info 
    title: "",
    description: "",
    features: "",
    // Price inventry 
    price: "",
    stock: "",
    images: [], //Array of string save string here,
    category: "",
    subCategory: "",


  }

  // Category 
  const { category, } = useCategory();
  console.log("Category is from component ", category);
  const priceCat = category?.slice(1);
  console.log("category are ", priceCat);


  const [form, setForm] = useState(state);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    console.log("Category is ", form.category)
    console.log("subCategory is ", form.subCategory)
  }

  const [message, setMessage] = useState("");
  const [imageFiles, setImageFiles] = useState([]);

  // Handling api---------------------
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setError("");
      setLoading(true);

      // Form data bana ke fir api call karenge 
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("features", form.features);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      formData.append("category", form.category) //cat id dena hai 
      formData.append("subCategory", form.subCategory) //cat id dena hai 

      // FormData array accept nahi karta
      // const images = [];
      // if (imageFiles && imageFiles.length > 0) {
      //   for (let image of imageFiles) {
      //     images.push(image);
      //   }
      // }
      // formData.append("images", images); //formdata me array nahi dal sakte hai 

      if (imageFiles && imageFiles.length > 0) {
        for (let image of imageFiles) {
          formData.append("images", image);
        }
      }

      const res = await createProductService(formData);
      console.log("Product is ", res);

      setMessage("Product added to store Successfully ✅");

    } catch (error) {
      setError(error.message || "Something went wrong ");

    } finally {
      setLoading(false);
    }

  }

  return (

    <div className=" mx-auto p-4 space-y-6">

      <Productgallery setImageFiles={setImageFiles} />

      <GeneralInfo handleChange={handleChange} form={form} />

      <PriceInventry
        handleChange={handleChange}
        form={form}
        categories={priceCat}
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