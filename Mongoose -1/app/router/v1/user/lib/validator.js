class Validator{
    addUser(req, res, next) {
        try {
            const { sName, sCity } = req.body;
            if (sName,sCity) {
                next();
                return;
            }
            else {
                return res.status(400).json({ sMessage : 'all Fields must be required' });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ sMessage :'validator error' });
        }
    }
}

module.exports = new Validator();