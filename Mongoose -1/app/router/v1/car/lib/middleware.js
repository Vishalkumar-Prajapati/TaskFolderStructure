class Middleware{
    addCar(req,res,next) {
        next();
    }
}

module.exports = new Middleware();