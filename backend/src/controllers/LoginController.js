const User = require('../models/Users');

// INDEX, SHOW, STORE, UPDATE, DELETE

module.exports = {
    async store(req, res) {
        const {username, password: pwd} = req.body;

        userExists = await User.findOne({user: username});
        if (userExists) {
            userExists.comparePwd(pwd, (err, isMatch) => {
                if (err) return console.error(err);

                if (isMatch) {
                    res.json({ok: true});
                } else {
                    res.json({ok: false});
                }
            });
        } else {
            res.json({error: "Invalid username/password"});
        }
    }
}