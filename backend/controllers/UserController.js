const User = require('../models/User');

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
    }
}