const User = require('../models/Users');

// INDEX, SHOW, STORE, UPDATE, DELETE

module.exports = {
    async store(req, res) {
        const {username, password: pwd, display: name} = req.body;

        userExists = await User.findOne({user: username});
        if (userExists) {
            return res.json({error: `${username} already exists!`});
        }

        await User.create({
            user: username,
            display: name, 
            password: pwd,
        });

        return res.json({message: `${username} created!`});
    },

    async update(req, res) {
        const {type} = req.body;
        const {userid: userId} = req.headers;
 
        userExists = await User.findById(userId);
        if (userExists){
            if (type == "name") {
                const {display: name} = req.body
                if (name != userExists.display) {
                    
                    userExists.display = name;
                    await userExists.save(function (err, user){
                        if (err) return console.error(err);
                        console.log(`${user.user} name saved!`)
                    });

                    res.json({success: "Name saved!"});
                } else {
                    res.json({error: "Name is the same as the old one!"});
                }

            } else if (type == "pwd") {
                const {password: pwd} = req.body
                userExists.comparePwd(pwd, async (err, isMatch) => {
                        if (err) return console.error(err);
                    
                        if (isMatch) {
                            res.json({error: "Password is the same as the old one!"});
                        } else {
                            userExists.password = pwd;

                            await userExists.save(function (err, user){
                                if (err) return console.error(err);
                                console.log(`${user.user} password saved!`)
                                res.json({success: "Password saved!"});
                            });
                        }
                    });
            }
        } else {
            res.json({error: "User not found!"});
        }

    }
};