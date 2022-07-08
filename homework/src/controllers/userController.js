const UserSchema = require('../models/userSchema')
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
    try {
        const user = new UserSchema({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        const emailExists = await UserSchema.exists({ email: req.body.email })
        if(emailExists) {
         return res.status(400).send({
              "message": "Email já cadastrado"
          })}

        if(user.name === "" || user.email === "" || user.password === "") {
            return res.status(400).send({ "message": "Preencha todos os campos" })
        }

        const savedUser = await user.save();
       
        res.status(201).send(savedUser);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const getAll = async (req, res) => {    
    UserSchema.find(function (err, users) {
        if(err) {
          return res.status(500).send({ 
            message: err.message })
        }
        return res.status(200).json(users)
    }) 
}

const updateUser = async (req, res) => {
    const user = await UserSchema.findById(req.params.id)
    if(!user) {
        return res.status(404).send({ message: "Usuário não encontrado" })
    }

    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    
    const updatedUser = await user.save()
    res.status(200).send(updatedUser)
}


const deleteUser = async (req, res) => {
    const user = await UserSchema.findByIdAndDelete(req.params.id)
    if(!user) {
        return res.status(404).send({ message: "Usuário não encontrado" })
    }
    await user.remove()
    res.status(200).send({ message: "Usuário deletado", user })
}

module.exports = {
    createUser,
    getAll,
    updateUser,
    deleteUser
}