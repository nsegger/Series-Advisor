const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
    user: {
        type: String,
        required: true,
        index: {unique: true}
    },
    password: {
        type: String,
        required: true
    },
    display: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

userSchema.pre('save', function(next) {
    var user = this;
    
    // if the password has not been changed (or created), there's no need to hash it again.
    if(!user.isModified('password')) return next();

    // generate a new salt.
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if(err) return next(err);

        // hash the password using the generated salt.
        bcrypt.hash(user.password, salt, (err, hashed) => {
            if(err) return next(err);
            
            // change the password to the hashed one.
            console.log(`The hashed pwd is: ${hashed}`);
            user.password = hashed;
            next();
        });
    });
});

userSchema.methods.comparePwd = function(pass2cmp, cb) {
    bcrypt.compare(pass2cmp, this.password, (err, match) => {
        if (err) return cb(err);

        cb(null, match);
    });
}

module.exports = model('User', userSchema);