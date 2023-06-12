class Validator {
    addSeller(req, res, next) {
        const { sSellerName, aCarIds,sCity } = req.body;
        if (sSellerName && aCarIds && sCity) {
            next();
        }
        else {
            res.status(400).json({ sMessage: 'all Fields must be required' });
        }
    }
}

module.exports = new Validator();
