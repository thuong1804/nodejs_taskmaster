import userService from '../service/userService'

const TestApi = async(req, res) => {
    const userList = await userService.getListUser();

    return res.status(200).json({
        message: 'ok',
        content: userList
    })
}

module.exports = {
    TestApi
}
