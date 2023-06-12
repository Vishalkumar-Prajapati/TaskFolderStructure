const User = require('../../../../model/sellerSchema');
const Cars = require('../../../../model/carSchema');

class Controller {
    async addSeller(req, res) {
        try {
            const { sSellerName, aCarIds, sCity } = req.body;
            for (let i = 0; i < aCarIds.length; i++) {
                const iCarId = aCarIds[i];
                const oCar = await Cars.findById({_id:iCarId});
                if(!oCar){
                    return res.status(400).json({ sMessage: `Car not found with id ${iCarId}`});
                }
            }
            const oSeller = await User.create({ sSellerName, aCarIds, sCity });
            res.status(200).json(oSeller);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ sMessage:'controller error' });
        }

    }
}

module.exports = new Controller();
