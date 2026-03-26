// Product middleware will check the Ownership of the Product 

const AuthError = require("../../shared/errors/AuthError");
const DatabaseError = require("../../shared/errors/DatabaseError");
const { findProductByid } = require("./product.repository");

// Product id se karna parega jo product ke liye request kar reha hai 
const checkProductOwner=()=>{
    return async(req,res,next)=>{
        const product=await findProductByid(req.params.id);
        if(!product){
            throw new DatabaseError("Product not found || Your are requesting for wrong resource ");
        }

        // Check the ownership 
        if(product.seller !==req.user.id && req.user.role !=="admin"){
            throw new AuthError("Your are not authencated For this resource ");
        }
        req.product=product;

        next();
    }
}

module.exports=checkProductOwner;