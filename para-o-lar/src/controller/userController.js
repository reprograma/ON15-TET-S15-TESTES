const UserSchema = require('../models/userSchema')
const bcrypt = require('bcrypt')

// const jwt = require("jsonwebtoken")

// const SECRET = process.env.SECRET

const getAll = async (req, res) => {
  UserSchema.find(function (err, users) {
    if (err) {
      return res.status(500).send({
        message: err.message
      })
    }
    return res.status(200).json(users)
  })
};

const createUser = async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashedPassword;

  try {
    const newUser = new UserSchema(req.body);

    const savedUser = await newUser.save();

    return res.status(201).send({
      "message": "User criado com sucesso",
      savedUser
    });
  } catch (e) {
    console.error(e);
  };
};

const updateUserById = async (req, res) => {
  try {
    const findUser = await UserSchema.findById(req.params.id)

    if (findUser) {
      findUser.name = req.body.name || findUser.name
      findUser.email = req.body.email || findUser.email
    }

    const savedUser = await findUser.save()

    return res.status(200).send({
      message: "Usuário atualizado com sucesso!",
      savedUser
    })

  } catch (error) {
    console.error(error)
  }
}

const deleteUserById = async (req, res) => {
  try {
    const userFound = await UserSchema.findById(req.params.id)

    await userFound.delete()

    return res.status(200).json({
      mensagem: `Usuário '${userFound.email}' deletado com sucesso!`
    })

  } catch (error) {
    return res.status(400).json({
      mensagem: err.message
    })
  }
}

module.exports = {
  getAll,
  createUser,
  updateUserById,
  deleteUserById
};