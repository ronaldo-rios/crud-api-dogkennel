const jwt = require('jsonwebtoken');

const createUserToken = async (user, request, response) => {

    //create token:
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, "nossosecret")

    //return token:
    response.status(200).json({
        message: 'Usuário autenticado', 
        token: token, 
        userId: user._id})

}

module.exports = createUserToken