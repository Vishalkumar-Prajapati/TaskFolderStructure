const Admin = require('../../../../model/admin');
const Transaction = require('../../../../model/transactionSchema');
const Brand = require('../../../../model/brandSchema');
const Car = require('../../../../model/carSchema');

class Controller {
    async addAdmin(req, res) {
        try {
            const oAdmin = await Admin.create({ sName: req.body.sName, sPassword: req.body.sPassword });
            return res.status(200).json(oAdmin);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ sMessage: 'controller error' });
        }
    }
    async totalSoldCars(req, res) {
        try {
            const nTotalCount = await Transaction.countDocuments();
            return res.status(200).json({ sMessage: `total sold cars : ${nTotalCount}` });
        } catch (error) {
            console.log('totalSoldCars', error);
            return res.status(500).json({ sMessage: 'controller error' });
        }
    }
    async mostSoldCarsCity(req, res) {
        try {
            const [oCountAndCity] = await Transaction.aggregate([
                {
                    $lookup: {
                        from: 'sellers',
                        localField: 'iSellerId',
                        foreignField: '_id',
                        as: 'aSeller',
                    },
                },
                {
                    $unwind: '$aSeller',
                },
                {
                    $sortByCount: '$aSeller.sCity',
                },
                {
                    $limit: 1,
                },
            ]);
            console.log(oCountAndCity);
            const sCity = oCountAndCity._id; // because we sortByCount perform on city name
            console.log(sCity);
            const nTotalCars = oCountAndCity.count;
            return res.status(200).json({ sMessage: `In ${sCity} city cars are most(${nTotalCars}) sold ` });
        } catch (error) {
            console.log('mostCity', error);
            return res.status(500).json({ sMessage: 'controller error' });
        }
    }
    async mostSoldCars(req, res) {
        try {
            const [oCarIdAndCount] = await Transaction.aggregate([
                {
                    $sortByCount:
                        '$iCarId',
                },
                {
                    $limit: 1
                }
            ]);
            const iCarId = oCarIdAndCount._id;
            const { sCarName } = await Car.findById(iCarId); 
            // console.log(sCarName);
            const nTotalCars = oCarIdAndCount.count;
            return res.status(200).json({ sMessage: `In ${sCarName} cars are most(${nTotalCars}) sold ` });
        } catch (error) {
            console.log('totalSoldCars', error);
            return res.status(500).json({ sMessage: 'controller error' });
        }
    }
    async mostSoldCarsBrand(req, res) {
        try {
            const aIdAndCount = await Transaction.aggregate([
                {
                    $lookup: {
                        from: 'cars',
                        localField: 'iCarId',
                        foreignField: '_id',
                        as: 'sCar',
                    },
                },
                {
                    $sortByCount: '$sCar.iBrandId',
                },
                {
                    $limit: 1,
                },
                {
                    $unwind: '$_id'
                }
            ]);
            // console.log(aIdAndCount);
            const iBrandId = aIdAndCount[0]._id;
            // console.log(iBrandId);
            const { sBrandName } = await Brand.findById(iBrandId);
            // console.log(sBrandName);
            const nTotalCars = aIdAndCount[0].count;
            return res.status(200).json({ sMessage: `In ${sBrandName} brands cars are most(${nTotalCars}) sold ` });
        } catch (error) {
            console.log('totalSoldCars', error);
            return res.status(500).json({ sMessage: 'controller error' });
        }
    }

}

module.exports = new Controller();


