class Validator{
    addAdmin(req, res, next) {
        try {
            const { sName, sPassword } = req.body;
            if (sName,sPassword) {
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