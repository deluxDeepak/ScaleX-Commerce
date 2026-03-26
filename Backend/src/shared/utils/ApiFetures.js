class Apifeature {
    constructor(dbQuery, paramsQuery) {
        this.dbQuery = dbQuery;
        this.paramsQuery = paramsQuery;
    }

    checkFeature = () => {
        console.log("Constructor Original Db query", this.dbQuery);
        console.log("Constructor paramsQuery", this.paramsQuery);
    }

    // Search product in database 
    search = () => {
        if (this.paramsQuery.search) {
            console.log("hit the search apifeature", this.paramsQuery);
            this.dbQuery = this.dbQuery.find({
                $text: { $search: this.paramsQuery.search }
            });
        }
        return this
    }
    // sort=rating,price --first rating then price sorting 
    sort = () => {
        if (this.paramsQuery.sort) {
            const sortquery = this.paramsQuery.sort.split(",").join(" ");
            console.log("Result query is ", sortquery);
            this.dbQuery = this.dbQuery.sort(sortquery);
        }
        return this;
    }

    execute = () => {
        return this.dbQuery
    }



}

module.exports = Apifeature;