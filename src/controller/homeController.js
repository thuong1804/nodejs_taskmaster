import userService from '../service/userService'

const handelHomeController = (req, res) => {
    return res.render("home.ejs");
}

const handelUserController = (req, res) => {
    const homeRouter = 'Home'
    return res.render("user.ejs", { homeRouter });
}

const handelCreateUserController = (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let password = req.body.password;

    userService.createNewUser(email, name, password)
    return res.send("createUser");
}

module.exports = {
    handelHomeController,
    handelUserController,
    handelCreateUserController
}