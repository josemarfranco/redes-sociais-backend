const UserSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");

const getAll = async (req, res) => {
    UserSchema.find(function (err, users) {
        if (err) {
            res.status(500).send({ message: err.message })
        }
        res.status(200).send(users)
    })
};

const createUser = async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        req.body.password = hashedPassword
        const newUser = new UserSchema(req.body)
        await newUser.save()
        res.status(201).send({
            message: "Usuário criado com sucesso",
            user: newUser
        })
    } catch (error) {
        res.status(400).send({
        message: error.message
        })
    }
}

//update de alguma informação
const updateUserById = async (req, res) => {

}

module.exports = {
    getAll,
    createUser,
    updateUserById
};
