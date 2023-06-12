const User =require('../../../../model/userSchema');

class Controller{
    async addUser(req,res) {
        try {
            const user = await User.create({sName: req.body.sName,sCity: req.body.sCity });
            return res.status(200).json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ sMessage: 'controller error' });
        }
    }
}

module.exports = new Controller();
