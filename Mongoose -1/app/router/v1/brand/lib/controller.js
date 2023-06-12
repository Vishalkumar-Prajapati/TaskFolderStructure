const User = require('../../../../model/brandSchema');

class Controller {
    async addBrand(req, res) {
        try {
            const oBrand = await User.create({ sBrandName: req.body.sBrandName });
            return res.status(200).json(oBrand);
        } catch (error) {
            console.error(error);
            return res.status(500).json('error in controller');
        }
    }
}

module.exports = new Controller();
