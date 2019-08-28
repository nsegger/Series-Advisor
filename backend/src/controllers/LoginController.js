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
                    res.json({user: userExists.user, display: userExists.display});
                } else {
                    res/*.status(403)*/.json({error: "Invalid username/password!"});
                }
            });
        } else {
            res/*.status(403)*/.json({error: "Invalid username/password!"});
        }
    }
}