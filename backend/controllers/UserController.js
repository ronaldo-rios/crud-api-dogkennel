const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');
const { findOne } = require('../models/User');

module.exports = class UserController {

    static async register(request, response){

        const {name, email, phone, password, confirmPassword} = request.body
    
        //Validations:
        if(!name){
            response.status(422).json({message: "O nome é obrigatório"})
            return
        }

        if(!email){
            response.status(422).json({message: 'O e-mail é obrigatório'})
            return
        }

        if(!phone){
            response.status(422).json({message: 'O telefone é obrigatório'})
            return
        }

        if(!password){
            response.status(422).json({message: 'A senha é obrigatória'})
            return
        }

        if(!confirmPassword){
            response.status(422).json({message: 'A confirmação de senha é obrigatória'})
            return
        }

        if(password !== confirmPassword){
            response.status(422).json({message: 'Senhas não correspondem! É preciso que as duas sejam iguais.'})
            return 
        }

        // Checking if user exists:
        const userExists = await User.findOne({email: email})

        if(userExists){
            response.status(422).json({message: 'E-mail de usuário já está em uso! Utilize outro e-mail.'})
            return 
        }

        //create a password:

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //crate a usser:

        const user = new User({
            name: name,
            email: email,
            phone: phone,
            password: passwordHash
        });


        try {
            const newUser = await user.save()
            createUserToken(newUser, request, response)
        }
        catch(err){
            response.status(500).json({message: err})
        }
    }


    static async login(request, response){

        const {email, password} = request.body

        if(!email){
            response.status(422).json({message: 'O e-mail é obrigatório!'})
        }

        if(!password){
            response.status(422).json({message: 'A senha é obrigatória!'})
        }

        // Checking if user exists:
        const user = await User.findOne({email: email})

        if(!user){
            response.status(422).json({message: 'Não há usuário cadastrado com esse e-mail!'})
            return 
        }


        // Checking if password match database password:
        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            response.status(422).json({message: 'Senha inválida!'})
            return 
        }

        await createUserToken(user, request, response);
    }


    static async checkUser(request, response){

        let currentUser;

        if(request.headers.authorization){
            const token = getToken(request);
            const decoded = jwt.verify(token, "nossosecret");

            currentUser = await User.findById(decoded.id);
            currentUser.password = undefined
        } 
        else {
            currentUser = null
        }
        response.status(200).send(currentUser);
    }


    static async getUserById(request, response){

        const id = request.params.id
        const user = await User.findById(id).select("-password")

        if(!user){
            response.status(422).json({message: "Usuário não encontrado!"});
            return
        }

        response.status(200).json({ user });
    }

    
    static async editUser(request, response){

        // Check if users exists:
        const token = getToken(request);
        const user = await getUserByToken(token);
        const {name, email, phone, password, confirmPassword} = request.body
        let image = ''

        //Validations:
        if(!name){
            response.status(422).json({message: "O nome é obrigatório"})
            return
        }

        user.name = name

        if(!email){
            response.status(422).json({message: 'O e-mail é obrigatório'})
            return
        }


        // Checking if email has already taken:
        const userExists = await User.findOne({email: email})

        if(user.email !== email && userExists){
            response.status(422).json({message: "Por favor, utilize outro e-mail"});
            return
        }

        user.email = email

        if(!phone){
            response.status(422).json({message: 'O telefone é obrigatório'})
            return
        }

        user.phone = phone

        if(password !== confirmPassword){
            response.status(422).json({message: 'Senhas não correspondem'})
            return
        }
        else if(password === confirmPassword && password != null){

            //Create password:
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash
        }


        try {
            // Returning user updated data:
            await User.findOneAndUpdate(
                {_id: user._id}, {$set: user}, {new: true}
            )

            response.status(200).json({message: 'Usuário atualizado com sucesso!'})
        }
        catch(error){
            response.status(500).json({message: error})
            return
        }
    }
}