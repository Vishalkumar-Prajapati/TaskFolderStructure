class Validator {

    addCar(req, res, next) {
        try {
            const { sCarName, iBrandId } = req.body;
            if (sCarName && iBrandId) {
                next();
                return;
            }
            else {
                return res.status(400).json({ sMessage: 'all Fields must be required' });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ sMessage: 'validator error' });
        }
    }
}

module.exports = new Validator();