class Middleware{
    addAdmin(req,res,next) {
        next();
    }
}

module.exports = new Middleware();