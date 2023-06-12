class Validator {
    buyCar(req, res, next) {
        try {
            const { iCarId, iSellerId, iUserId } = req.body;
            if (iCarId && iSellerId && iUserId) {
                next();
                return;
            }
            else {
                return res.status(400).json({ sMessage: 'all Fields must be required' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ sMessage: 'error in validator' });
        }
    }
}
module.exports = new Validator();