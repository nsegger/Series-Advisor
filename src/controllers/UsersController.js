const User = require('../models/Users')

module.exports = {
    async store(req, res) {
        const {username, password: pwd} = req.body;

        await User.create({
            user: username,
            password: pwd,
        });

        return res.json({message: `${username} created!`});
    }
};