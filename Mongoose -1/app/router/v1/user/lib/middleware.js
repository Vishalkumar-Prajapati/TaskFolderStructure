class Middleware{
    addUser(req,res,next) {
        next();
    }
}

module.exports = new Middleware();