const User = require('../../../../model/userSchema');
const Seller = require('../../../../model/sellerSchema');

class Middleware {
    async buyCar(req, res, next) {
        try {
            req.oUser = await User.findById(req.body.iUserId);
            req.oSeller = await Seller.findById(req.body.iSellerId);
            if (!req.oUser || !req.oSeller) {
                return res.status(404).json({ sMessage: 'user or seller is not found' });
            }
            if (req.oUser.sCity === req.oSeller.sCity) {
                next(); 
                return;
            } else {
                return res.status(400).json({ sMessage: 'user can not eligible for buy car from out side of city' });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ sMessage: 'Error in middleware' });
        }
    }
}

module.exports = new Middleware();
