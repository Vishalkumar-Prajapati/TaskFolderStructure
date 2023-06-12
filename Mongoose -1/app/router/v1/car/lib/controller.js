const User = require('../../../../model/carSchema');
const Brand = require('../../../../model/brandSchema');

class Controller {
    async addCar(req, res) {
        try {
            const oBrand = await Brand.findOne({_id:req.body.iBrandId});
            // console.log(oBrand);
            if(!oBrand){
                return res.status(404).json({sMessage:'brand not found'});
            }
            const oCar = await User.create({ sCarName: req.body.sCarName, iBrandId: req.body.iBrandId });
            // const user = await User.where({ sCarName: req.body.sCarName });
            // console.log(user);
            if(!oCar){
                return res.status(500).json({sMessage:' car in not added to database'});
            }
            return res.status(200).json(oCar);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ sMessage : 'controller error' });
        }

    }
}

module.exports = new Controller();
