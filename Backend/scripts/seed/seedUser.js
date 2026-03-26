const bcrypt = require("bcrypt");
const User = require("../../src/modules/user/user.model");
const dataUser = require("./data/dataUser");

// const dataUser = require("./dataUser");

const seedUser = async () => {
    await User.deleteMany();

    for (const u of dataUser) {
        // password hash karke save kar sakte hai 
        const hash = await bcrypt.hash(u.password, 10);
        await User.create({
            ...u,
            password: hash,
        });
    }

    console.log("Users seeded");
};

module.exports = seedUser;