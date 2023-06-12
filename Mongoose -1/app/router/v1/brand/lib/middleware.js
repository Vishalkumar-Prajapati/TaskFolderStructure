class Middleware{
    addBrand(req,res,next) {
        next();
    }
}

module.exports = new Middleware();