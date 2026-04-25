const { getDashboardData, getSellerProfile, updateSellerProfile, deleteSellerAccount } = require('./seller.controller');

const router = require('express').Router();

/* 
Seller dashboard ==============
    - Total earning 
    - Total Product count
    - Total orders 
    - in stock /out of stock 

*/

router.get("/dashboard", getDashboardData);



//======== Profile management ===================
router.get("/profile", getSellerProfile);        // fetch account
router.patch("/profile", updateSellerProfile);  // update account/profile
router.delete("/profile", deleteSellerAccount); // delete account


// =====Order management in order module  ==========


