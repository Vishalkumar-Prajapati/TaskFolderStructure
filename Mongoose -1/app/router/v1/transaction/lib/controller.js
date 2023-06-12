const Transaction = require('../../../../model/transactionSchema');
// const User = require('../../../../model/userSchema');
// const Seller = require('../../../../model/sellerSchema');
const Cars = require('../../../../model/carSchema');

class Controller {
    async buyCar(req, res) {
        console.log(req.body);
        const oCarId = await Cars.findById({_id:req.body.iCarId});
        if (!oCarId) {
            return res.status(404).json({ sMessage: 'Car not found' });
        }
        else {
            // car is present in seller's array
            const isCarExistInSeller = req.oSeller.aCarsId.includes(oCarId._id);
            if (!isCarExistInSeller) {
                return res.status(404).json({ sMessage: 'seller does not have the car available' });
            }
        }
        const oTransaction = await Transaction.create({
            iCarId: oCarId._id,
            iUserId: req.oUser._id,
            iSellerId: req.oSeller._id
        });
        // await User.updateOne(iUserId, { $push: { aCars: iCarId } });
        // const t = await Transaction.find().populate('iCarId').populate('iUserId').populate('iSellerId');
        // console.log(t);
        return res.status(200).json(oTransaction);
    }
}

module.exports = new Controller();
