class Middleware{
    addSeller(req,res,next) {
        next();
    }
}

module.exports = new Middleware();