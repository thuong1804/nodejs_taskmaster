import userService from '../service/userService'

const handelHomeController = (req, res) => {
    return res.render("home.ejs");
}

const handelUserController = (req, res) => {
    const homeRouter = 'Home'
    return res.render("user.ejs", { homeRouter });
}

const handelDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id)
    return res.redirect("/user/get-list");
}

const handelGetIdByUserController = async (req, res) => {
    let id = req.params.id;
    let user = await userService.getUserById(id);
    return res.render("updateUser.ejs", { user });
}

const handelUpdateUser = async (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let id = req.body.id;
    await userService.updateUser(id, email, username);
    return res.redirect("/user/get-list");
}

module.exports = {
    handelHomeController,
    handelUserController,
    handelDeleteUser,
    handelGetIdByUserController,
    handelUpdateUser,
}