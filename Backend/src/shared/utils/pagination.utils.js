
// ye repo me use kar sakte hai || 
/**
 * page aur limit req.query se aate hai
 * mongoQuery--->Product.find()
 * query-------->/product?page=2&limit=10
*/

const pagination = (mongoQuery, query = {}) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    return mongoQuery.skip(skip).limit(limit);
}
module.exports = pagination