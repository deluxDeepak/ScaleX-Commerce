import { frontPage1, frontPage2, frontPage3, frontPage4 } from "../../../assets";

export const products = [

  {
    id: 1,
    title: "iPhone 14 Pro",
    category: "Electronics",
    subCategory: "Mobiles",
    section: "Trending",
    price: 1200,
    oldPrice: 1400,
    rating: 4.8,
    stock: 20,
    images: [frontPage1, frontPage2, frontPage3],
    description: "Latest Apple iPhone with A16 Bionic chip and advanced camera system.",
    features: [
      "6.1-inch Super Retina XDR Display",
      "A16 Bionic Chip",
      "48MP Camera",
      "5G Support"
    ],
    reviews: [
      { id: 1, name: "Rahul", rating: 5, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Amazing phone with great camera!" },
      { id: 2, name: "Anita", rating: 4, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Battery life is good." }
    ]
  },

  {
    id: 2,
    title: "Samsung Galaxy S23",
    category: "Electronics",
    subCategory: "Mobiles",
    section: "Best Seller",
    price: 900,
    oldPrice: 1050,
    rating: 4.7,
    stock: 25,
    images: [frontPage2, frontPage3, frontPage4],
    description: "Premium Samsung flagship smartphone with powerful processor and camera.",
    features: [
      "6.1-inch AMOLED Display",
      "Snapdragon 8 Gen 2",
      "50MP Camera",
      "Fast Charging"
    ],
    reviews: [
      { id: 1, name: "Arjun", rating: 5, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Performance is super fast." },
      { id: 2, name: "Priya", rating: 4, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Camera quality is excellent." }
    ]
  },

  {
    id: 3,
    title: "MacBook Air M2",
    category: "Electronics",
    subCategory: "Laptops",
    section: "Recommended",
    price: 1500,
    oldPrice: 1650,
    rating: 4.9,
    stock: 15,
    images: [frontPage3, frontPage4, frontPage1],
    description: "Ultra-thin laptop powered by Apple's M2 chip for high performance.",
    features: [
      "M2 Chip",
      "13.6-inch Retina Display",
      "18-hour battery life",
      "Fanless design"
    ],
    reviews: [
      {
        id: 1,
        name: "Karan",
        rating: 5,
        description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Best laptop for developers.",
        images: [frontPage1, frontPage4]
      },
      {
        id: 2,
        name: "Karan",
        rating: 5,
        description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Best laptop for developers.",
        images: [frontPage1, frontPage4]
      },
      {
        id: 3,
        name: "Karan",
        rating: 5,
        description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Best laptop for developers.",
        images: [frontPage1, frontPage4]
      },
      { id: 2, name: "Neha", rating: 5, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Battery life is amazing." }
    ]
  },

  {
    id: 4,
    title: "Dell XPS Laptop",
    category: "Electronics",
    subCategory: "Laptops",
    section: "Trending",
    price: 1400,
    oldPrice: 1550,
    rating: 4.6,
    stock: 18,
    images: [frontPage4, frontPage1, frontPage2],
    description: "Premium Windows laptop with powerful performance and slim design.",
    features: [
      "Intel i7 Processor",
      "16GB RAM",
      "Infinity Edge Display",
      "SSD Storage"
    ],
    reviews: [
      { id: 1, name: "Rohit", rating: 4, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Great build quality." },
      { id: 2, name: "Simran", rating: 5, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Perfect for work and coding." }
    ]
  },

  {
    id: 5,
    title: "Samsung Smart TV",
    category: "Electronics",
    subCategory: "TV",
    section: "Trending",
    price: 800,
    oldPrice: 920,
    rating: 4.7,
    stock: 22,
    images: [frontPage1, frontPage2, frontPage4],
    description: "4K UHD Smart TV with HDR and built-in streaming apps.",
    features: [
      "4K Resolution",
      "HDR10+",
      "Smart TV Apps",
      "Voice Control"
    ],
    reviews: [
      { id: 1, name: "Ajay", rating: 5, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Picture quality is excellent." },
      { id: 2, name: "Deepa", rating: 4, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Good sound and display." }
    ]
  },

  {
    id: 6,
    title: "Sony Bluetooth Headphones",
    category: "Electronics",
    subCategory: "Accessories",
    section: "New Arrival",
    price: 250,
    oldPrice: 300,
    rating: 4.6,
    stock: 30,
    images: [frontPage2, frontPage3, frontPage1],
    description: "Noise cancelling wireless headphones with deep bass.",
    features: [
      "Active Noise Cancellation",
      "30-hour Battery",
      "Bluetooth 5.0",
      "Fast Charging"
    ],
    reviews: [
      { id: 1, name: "Ravi", rating: 5, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Sound quality is fantastic." },
      { id: 2, name: "Nisha", rating: 4, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Very comfortable." }
    ]
  },

  {
    id: 7,
    title: "Nike Running Shoes",
    category: "Footwear",
    subCategory: "Sports Shoes",
    section: "Best Seller",
    price: 120,
    oldPrice: 150,
    rating: 4.6,
    stock: 40,
    images: [frontPage3, frontPage4, frontPage2],
    description: "Lightweight running shoes designed for speed and comfort.",
    features: [
      "Breathable mesh",
      "Cushioned sole",
      "Lightweight design",
      "Durable grip"
    ],
    reviews: [
      { id: 1, name: "Aman", rating: 5, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Very comfortable for running." },
      { id: 2, name: "Sahil", rating: 4, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Stylish and durable." }
    ]
  },

  {
    id: 8,
    title: "Adidas Sneakers",
    category: "Footwear",
    subCategory: "Sneakers",
    section: "New Arrival",
    price: 110,
    oldPrice: 135,
    rating: 4.5,
    stock: 35,
    images: [frontPage4, frontPage1, frontPage3],
    description: "Casual sneakers perfect for everyday wear.",
    features: [
      "Soft cushioning",
      "Stylish design",
      "Comfortable sole",
      "Durable material"
    ],
    reviews: [
      { id: 1, name: "Meena", rating: 4, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Very stylish shoes." },
      { id: 2, name: "Raj", rating: 5, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Comfortable for daily use." }
    ]
  },

  {
    id: 9,
    title: "Puma Training Shoes",
    category: "Footwear",
    subCategory: "Sports Shoes",
    section: "Trending",
    price: 130,
    oldPrice: 160,
    rating: 4.4,
    stock: 32,
    images: [frontPage1, frontPage3, frontPage2],
    description: "Perfect training shoes for gym and workouts.",
    features: [
      "Shock absorption",
      "Lightweight sole",
      "Breathable material",
      "Gym friendly design"
    ],
    reviews: [
      { id: 1, name: "Rakesh", rating: 4, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Great for workouts." },
      { id: 2, name: "Sonam", rating: 5, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Very comfortable." }
    ]
  },

  {
    id: 10,
    title: "Men Casual Shirt",
    category: "Clothes",
    subCategory: "Shirts",
    section: "New Arrival",
    price: 40,
    oldPrice: 55,
    rating: 4.4,
    stock: 50,
    images: [frontPage2, frontPage3, frontPage4],
    description: "Comfortable cotton casual shirt for everyday wear.",
    features: [
      "100% cotton",
      "Breathable fabric",
      "Regular fit",
      "Machine washable"
    ],
    reviews: [
      { id: 1, name: "Manish", rating: 4, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Nice fabric." },
      { id: 2, name: "Aarti", rating: 5, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Looks great." }
    ]
  },

  {
    id: 11,
    title: "Cotton Kurti",
    category: "Clothes",
    subCategory: "Kurti",
    section: "Trending",
    price: 55,
    oldPrice: 70,
    rating: 4.5,
    stock: 28,
    images: [frontPage3, frontPage1, frontPage4],
    description: "Elegant cotton kurti suitable for casual and festive wear.",
    features: [
      "Soft cotton fabric",
      "Traditional design",
      "Comfort fit",
      "Lightweight"
    ],
    reviews: [
      { id: 1, name: "Priya", rating: 5, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Beautiful design." },
      { id: 2, name: "Ritu", rating: 4, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Very comfortable." }
    ]
  },

  {
    id: 12,
    title: "Designer Lehenga",
    category: "Clothes",
    subCategory: "Lehnga",
    section: "Flash Sales",
    price: 200,
    oldPrice: 260,
    rating: 4.7,
    stock: 15,
    images: [frontPage4, frontPage2, frontPage3],
    description: "Premium designer lehenga perfect for weddings.",
    features: [
      "Heavy embroidery",
      "Premium fabric",
      "Elegant design",
      "Comfort fit"
    ],
    reviews: [
      { id: 1, name: "Sneha", rating: 5, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Perfect for weddings." },
      { id: 2, name: "Pooja", rating: 4, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Very elegant." }
    ]
  },

  {
    id: 13,
    title: "Traditional Saree",
    category: "Clothes",
    subCategory: "Saree",
    section: "Best Seller",
    price: 120,
    oldPrice: 150,
    rating: 4.6,
    stock: 24,
    images: [frontPage1, frontPage4, frontPage3],
    description: "Traditional silk saree with beautiful patterns.",
    features: [
      "Silk fabric",
      "Elegant design",
      "Festival wear",
      "Lightweight"
    ],
    reviews: [
      { id: 1, name: "Shalini", rating: 5, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Very beautiful saree." },
      { id: 2, name: "Kavita", rating: 4, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Great quality." }
    ]
  },

  {
    id: 14,
    title: "Men Slim Fit Jeans",
    category: "Clothes",
    subCategory: "Jeans",
    section: "Recommended",
    price: 70,
    oldPrice: 95,
    rating: 4.5,
    stock: 45,
    images: [frontPage2, frontPage1, frontPage3],
    description: "Stylish slim fit jeans for modern look.",
    features: [
      "Stretchable fabric",
      "Slim fit",
      "Durable denim",
      "Comfortable wear"
    ],
    reviews: [
      { id: 1, name: "Arvind", rating: 5, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Perfect fitting." },
      { id: 2, name: "Nitin", rating: 4, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Good quality denim." }
    ]
  },

  {
    id: 15,
    title: "Cricket Bat",
    category: "Gaming",
    subCategory: "Cricket",
    section: "Best Seller",
    price: 70,
    oldPrice: 90,
    rating: 4.6,
    stock: 30,
    images: [frontPage3, frontPage4, frontPage1],
    description: "Professional cricket bat made with premium wood.",
    features: [
      "Premium willow wood",
      "Balanced weight",
      "Strong grip",
      "Professional design"
    ],
    reviews: [
      { id: 1, name: "Vikas", rating: 5, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Great balance." },
      { id: 2, name: "Sanjay", rating: 4, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Good for matches." }
    ]
  },

  {
    id: 16,
    title: "Cricket Ball",
    category: "Gaming",
    subCategory: "Cricket",
    section: "Trending",
    price: 20,
    oldPrice: 30,
    rating: 4.3,
    stock: 60,
    images: [frontPage4, frontPage3, frontPage2],
    description: "Durable leather cricket ball for professional matches.",
    features: [
      "Leather finish",
      "High durability",
      "Professional weight",
      "Strong stitching"
    ],
    reviews: [
      { id: 1, name: "Ramesh", rating: 4, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Good bounce." },
      { id: 2, name: "Imran", rating: 4, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Quality leather." }
    ]
  },

  {
    id: 17,
    title: "Badminton Racket",
    category: "Gaming",
    subCategory: "Badminton",
    section: "New Arrival",
    price: 60,
    oldPrice: 80,
    rating: 4.4,
    stock: 35,
    images: [frontPage1, frontPage2, frontPage3],
    description: "Lightweight badminton racket with strong grip.",
    features: [
      "Lightweight frame",
      "Strong strings",
      "Comfort grip",
      "Professional design"
    ],
    reviews: [
      { id: 1, name: "Akash", rating: 5, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Very light racket." },
      { id: 2, name: "Rina", rating: 4, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Great for beginners." }
    ]
  },

  {
    id: 18,
    title: "Pressure Cooker",
    category: "Home Essentials",
    subCategory: "Kitchen",
    section: "Recommended",
    price: 90,
    oldPrice: 110,
    rating: 4.5,
    stock: 40,
    images: [frontPage2, frontPage4, frontPage3],
    description: "Durable stainless steel pressure cooker.",
    features: [
      "Stainless steel body",
      "Fast cooking",
      "Safety lock",
      "Energy efficient"
    ],
    reviews: [
      { id: 1, name: "Sunita", rating: 5, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Very useful." },
      { id: 2, name: "Geeta", rating: 4, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Good quality." }
    ]
  },

  {
    id: 19,
    title: "Air Conditioner",
    category: "Home Essentials",
    subCategory: "Appliances",
    section: "Trending",
    price: 600,
    oldPrice: 720,
    rating: 4.6,
    stock: 12,
    images: [frontPage3, frontPage1, frontPage4],
    description: "Energy efficient air conditioner with fast cooling.",
    features: [
      "1.5 Ton capacity",
      "Inverter technology",
      "Fast cooling",
      "Low noise"
    ],
    reviews: [
      { id: 1, name: "Kunal", rating: 5, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Cooling is very fast." },
      { id: 2, name: "Anjali", rating: 4, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Good energy saving." }
    ]
  },

  {
    id: 20,
    title: "Wall Clock",
    category: "Home Essentials",
    subCategory: "Decor",
    section: "New Arrival",
    price: 35,
    oldPrice: 50,
    rating: 4.4,
    stock: 55,
    images: [frontPage4, frontPage2, frontPage1],
    description: "Modern wall clock perfect for home decor.",
    features: [
      "Silent movement",
      "Modern design",
      "Durable build",
      "Easy wall mount"
    ],
    reviews: [
      { id: 1, name: "Rohini", rating: 4, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Looks beautiful." },
      { id: 2, name: "Tarun", rating: 5, description: "Description of the products Amzing prodducts with nice fatures and better battery life and charger is greate to use and long lasting battery life ", comment: "Great decor item." }
    ]
  }

];