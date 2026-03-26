const dataUser = [
  // ✅ ADMIN
  {
    name: "Admin User",
    email: "admin@test.com",
    password: "123456",
    phone: "9000000001",
    profileImg:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",

    role: "admin",
    isVerified: true,

    addresses: [
      {
        label: "Home",
        fullName: "Admin User",
        phone: "9000000001",
        street: "Admin Street",
        city: "Kolkata",
        state: "WB",
        pincode: "700001",
        country: "India",
        isDefault: true,
      },
    ],
  },

  // ✅ SELLER 1
  {
    name: "Seller One",
    email: "seller1@test.com",
    password: "123456",
    phone: "9000000002",
    profileImg:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",

    role: "seller",
    isVerified: true,

    addresses: [
      {
        label: "Work",
        fullName: "Seller One",
        phone: "9000000002",
        street: "Market Road",
        city: "Delhi",
        state: "Delhi",
        pincode: "110001",
        country: "India",
        isDefault: true,
      },
    ],
  },

  // ✅ SELLER 2
  {
    name: "Seller Two",
    email: "seller2@test.com",
    password: "123456",
    phone: "9000000003",
    profileImg:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12",

    role: "seller",
    isVerified: true,

    addresses: [
      {
        label: "Home",
        fullName: "Seller Two",
        phone: "9000000003",
        street: "MG Road",
        city: "Mumbai",
        state: "MH",
        pincode: "400001",
        country: "India",
        isDefault: true,
      },
    ],
  },

  // ✅ CUSTOMER 1
  {
    name: "Rahul Sharma",
    email: "user1@test.com",
    password: "123456",
    phone: "9000000004",
    profileImg:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",

    role: "customer",

    addresses: [
      {
        label: "Home",
        fullName: "Rahul Sharma",
        phone: "9000000004",
        street: "Street 1",
        city: "Patna",
        state: "BR",
        pincode: "800001",
        country: "India",
        isDefault: true,
      },
    ],
  },

  // ✅ CUSTOMER 2
  {
    name: "Amit Kumar",
    email: "user2@test.com",
    password: "123456",
    phone: "9000000005",
    profileImg:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2",

    role: "customer",

    addresses: [
      {
        label: "Other",
        fullName: "Amit Kumar",
        phone: "9000000005",
        street: "Street 2",
        city: "Ranchi",
        state: "JH",
        pincode: "834001",
        country: "India",
        isDefault: true,
      },
    ],
  },
];

module.exports = dataUser;