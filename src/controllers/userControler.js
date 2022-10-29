const UserSchema = require("../models/userSchema");
const bcrypt = require("bcrypt")
const getAll = async (req, res) => {
    UserSchema.find(function (err, users) {
        if (err) {
            res.status(500).send({ message: err.message })
        }
        res.status(200).send(users)
    })
};

const createUser = async (req, res) => {
    //console.log("SENHA ANTES DO HASH", req.body.password)
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    //console.log("SENHA DEPOIS DO HASH", hashedPassword, "SENHA DO BODY", req.body.password)
    req.body.password = hashedPassword

    //console.log("COMO ESTÁ O REQ BODY?", req.body.password)

    try {
        const findUser = await UserSchema.findById(req.params.id);

        if (findUser) {
            findUser.name = req.body.name || find.name;
            findUser.email = req.body.email || find.email;

        }
        // acessar as informações que vem no body da requisição
        const newUser = new UserSchema(req.body);

        // criar o novo usuário
        const savedUser = await findUser.save();

        // enviar uma resposta
        res.status(201).send({
            message: "Usuário criado com sucesso",
            savedUser
        })
    } catch (error) {
        console.error(error)
    }
};
//update de alguma informação
const updateUserById = async (req, res) => {

}

module.exports = {
    getAll,
    createUser,
    updateUserById
};
