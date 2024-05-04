import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);


export const hashUserPassWord = (password) => {
    const hashPass = bcrypt.hashSync(password, salt);
    return hashPass;
}

export const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
}