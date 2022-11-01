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
        if (await UserSchema.findOne({email: req.body.email})) {
            res.status(400).send({
                message: "Usuário " + req.body.email + " já cadastrado"
                })
        } else {
            await newUser.save()
            res.status(201).send({
                message: "Usuário criado com sucesso",
                user: newUser
        })
    }
    } catch (error) {
        res.status(400).send({
        message: error.message
        })
    }
}

const updateUserById = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword
    UserSchema.findByIdAndUpdate(req.params.id, {name: req.body.name, email: req.body.email, password: req.body.password}, function (error, user) {
        if (error){
            res.status(400).send({
            message: error.message
            })
        } else {
            res.status(200).send({
            message: "Usuário atualizado com sucesso", user
            })
        }
    })
}

const deleteUserById = async (req, res) => {
    UserSchema.findByIdAndDelete(req.params.id, function (error, user) {
        if (error){
            res.status(400).send({
            message: error.message
            })
        } else if (user !== null){
            res.status(200).send({
            message: "Usuário removido com sucesso:", user
            })
        } else {
            res.status(400).send({
                message: "Usuário inexistente"
            })
        }
    })
}

module.exports = {
    getAll,
    createUser,
    updateUserById,
    deleteUserById
};
