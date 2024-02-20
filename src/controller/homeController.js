const handelHomeController = (req, res) => {
    return res.render("home.ejs");
}

const handelUserController = (req, res) => {
    const homeRouter = 'Home'
    return res.render("user.ejs", {homeRouter});
}

module.exports= {
    handelHomeController,
    handelUserController
}