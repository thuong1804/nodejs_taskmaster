import userService from '../service/userService'
import db from '../models/index'
import jwt from 'jsonwebtoken';
const multer = require('multer');
const path = require('path');
const fs = require('fs')

const handelGetListUser = async (req, res) => {
    const {email} = req.body
    try {
        const userList = await userService.getListUser(email);
        if (!userList) {
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "Failed get list user",
            });
        }
        return res.status(200).json({
            status: "success",
            message: 'Get list success',
            data: {
                content: userList
            },
            result: true,
        })
    } catch (error) {
        console.log({ error })
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
}

const handelCreateUserController = async (req, res) => {
    try {
        const { email, name, address, gender, password, groupId, phone, birthDay} = req.body;
        const existingUser = await db.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "It seems you already have an account, please log in instead.",
            });
        }
        if (password.length < 8) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: "Password is too short. Please enter a password with at least 8 characters.",
            })
        }
        if (phone.length < 10) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: "Phone  is too short. Please enter a phone with at least 10 number.",
            })
        }
        await userService.createNewUser(
            email,
            name,
            address,
            gender,
            password,
            groupId,
            phone,
            birthDay
        )
        return res.status(200).json({
            status: "success",
            message: 'Create user success',
            data: {
                ...req.body
            },
            result: true,
        })
    } catch (error) {
        console.log({ error })
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
}

const handelDeleteUser = async (req, res) => {
    const id = req.params.id
    try {
        await userService.deleteUser(id);
        return res.status(200).json({
            status: "success",
            message: 'Delete user success',
            data: {
                userId: id
            },
            result: true,
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
}

const handelGetByIdUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await userService.getUserById(id);
        return res.status(200).json({
            status: "success",
            message: 'Get user success',
            data: {
                content: user
            },
            result: true,
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
}

const handelUpdateUser = async (req, res) => {
    const { id, email, name, address, gender, groupId, phone, birthDay } = req.body
    try {
        await userService.updateUser(id, email, name, address, gender, groupId, phone, birthDay);
        return res.status(200).json({
            status: "success",
            message: 'Update user success',
            data: {
                content: {
                    email,
                    name,
                    address,
                    gender,
                    groupId,
                    phone,
                    birthDay,
                }
            },
            result: true,
        })
    } catch (error) {
        console.log({ error })
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
}

const handelUpdateProfile = async (req, res) => {
    const { id, email, name, address, gender, phone, birthDay, avatar, groupId} = req.body
    try {
        await userService.updateProfile(
            id, 
            email, 
            name, 
            address, 
            gender, 
            phone, 
            birthDay,
            avatar, 
            groupId
        ) ;
        return res.status(200).json({
            status: "success",
            message: 'Update profile success',
            data: {
                content: {
                    id,
                    email,
                    name,
                    address,
                    gender,
                    phone,
                    birthDay,
                    groupId,
                    avatar,
                }
            },
            result: true,
        })
    } catch (error) {
        console.log({ error })
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
}


const handelGetProfileUser = async (req, res) => {
    const cookie = req.cookies
    if (cookie && cookie.login) {
        let loginToken = cookie.login;
        try {
            jwt.verify(loginToken, process.env.ACCESS_TOKEN_SECRET, async (error, decode) => {
                const emailUser = decode?.email
                if (!error && emailUser) {
                    try {
                        const user = await userService.getProfileUser(emailUser);
                        if (!user) {
                            return res.status(402).json({
                                status: 'Get profile failed',
                                result: false,
                            })
                        }
                        return res.status(200).json({
                            status: 'Get profile success',
                            data: {
                                content: {
                                    id: user.id,
                                    email: user.email,
                                    name: user.name,
                                    address: user.address,
                                    gender: user.gender,
                                    groupId: user.groupId,
                                    Group: user.Group,
                                    avatar: user.avatar,
                                },
                            },
                            result: true
                        })
                    } catch (error) {
                        console.error(error)
                        res.status(500).json({
                            status: "error",
                            code: 500,
                            data: [],
                            message: "Internal Server Error",
                        });
                    }
                } else {
                    return res.sendStatus(501);
                }
            });
        } catch (error) {
            console.error({ error });
            return res.sendStatus(500);
        }
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/uploads'); // Thư mục lưu trữ file
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext); // Tạo tên file mới để tránh trùng lặp
    },
  });
  
const upload = multer({ storage: storage });

const handleUploadAvatar = async (req, res) => {
    try {
      upload.single('avatar')(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ message: 'Upload avatar failed' });
        }
        const { filename, path } = req.file;
        console.log({path})
        const {id} = req.body
        await userService.updateAvatar(id, filename)
        return res.status(200).json({
            status: 'Upload success',
            data: {
                path,
                filename
            },
            result: true
        })
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi server' });
    }
  };

  const handelDeleteAvatar = (req, res) => {
    const imageName = req.params.imgName;
    const id = req.body.id;
    const imagePath = path.join(__dirname, '..', 'uploads', imageName); // Construct the full path to the image
    if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error deleting image:', err);
                return res.status(500).send('Internal Server Error');
            }
            db.User.update({
                avatar: null,
            }, {
                where: {
                    id,
                }
            });
            return res.send('Image deleted successfully');
        });
    } else {
        return res.status(404).send('Image not found');
    }
};

module.exports = {
    handelCreateUserController,
    handelGetListUser,
    handelDeleteUser,
    handelGetByIdUser,
    handelUpdateUser,
    handelGetProfileUser,
    handleUploadAvatar,
    handelDeleteAvatar,
    handelUpdateProfile,
}