const authenticate = require('../../middlewares/auth.middleware');
const { getDashboardData, getSellerProfile, updateSellerProfile, deleteSellerAccount, createSellerProfile } = require('./seller.controller');

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
router.post("/profile", authenticate, createSellerProfile);    // user become seller -->done

router.get("/profile", authenticate, getSellerProfile);        // fetch account -->done

router.patch("/profile", authenticate, updateSellerProfile);  // update account/profile

router.delete("/profile", authenticate, deleteSellerAccount); // delete account


// =====Order management in order module  ==========

module.exports = router;


