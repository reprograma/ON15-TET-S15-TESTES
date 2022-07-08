const FeiraSchema = require('../models/feiraSchema');
const bcrypt = require("bcrypt");


const getAll = async (req, res) => {    
    FeiraSchema.find(function(err, feira) {
        if (err) {
            res.status(500).send({
                message: err.message
            })
        }
        return res.status(200).json(feira)
    })
};

const registerBusiness = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    req.body.password = hashedPassword;

    try {                
        const newBusiness = new FeiraSchema(req.body);
    
        const savedBusiness = await newBusiness.save();
                
        return res.status(201).send({
            "message": "Negócio cadastrado com sucesso",
            savedBusiness
        });
             
    } catch(err) {
        console.error(err);        
    };     
};

const deleteBusiness = async (req,res) => {
    try {
        const deletedBusiness = await FeiraSchema.findByIdAndDelete(req.params.id)
        
        await deletedBusiness.delete()

        return res.status(200).send({
            "message": "Negócio deletado com sucesso",
            deletedBusiness
        })
    } catch(err) {
        console.error(err);
    };
};

module.exports = {
    getAll,
    registerBusiness,    
    deleteBusiness
};