class Validator{
    addBrand(req, res, next) {
        try {
            const { sBrandName } = req.body;
            if (sBrandName) {
                next();
                return;
            }
            else {
                return res.status(400).json({ sMessage : 'all Fields must be required' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ sMessage:'validator error' });
        }
    }
}

module.exports = new Validator();