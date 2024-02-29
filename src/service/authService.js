import db from '../models/index';

const login = async(email, password) => {
    try {
      const user = await db.User.findOne({
            where: {
                email: email,
                password: password,
            }
        })
        return user;
    } catch (error) {
        console.log({ error });
        throw error;
    }
}

module.exports = {
    login,
}