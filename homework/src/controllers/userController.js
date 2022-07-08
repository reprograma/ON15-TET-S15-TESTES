const UserSchema = require('../models/userSchema')
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword

    try {
        const user = new UserSchema(req.body)

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
    try {
        const user = await UserSchema.findById(req.params.id)
        if(!user) {
            return res.status(404).send({ message: "Usuário não encontrado" })
        }
        
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        
        const updatedUser = await user.save()
        return res.status(200).send(updatedUser)        
    } catch (error) {
         console.error(error)
        
    }
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