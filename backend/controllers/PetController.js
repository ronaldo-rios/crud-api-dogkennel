
const Pet = require('../models/Pet');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class PetController {


    //creating a pet:
    static async create(request, response){
        const name = request.body.name
        const age = request.body.age
        const weight = request.body.weight
        const color = request.body.color
        const images = request.files
        const available = true

        // images upload:



        // Validations:
        if(!name){
            response.status(422).json({message: 'O nome é obrigatório!'});
            return
        }

        if(!age){
            response.status(422).json({message: 'A idade é obrigatória!'});
            return
        }

        if(!weight){
            response.status(422).json({message: 'O peso é obrigatório!'});
            return
        }

        if(!color){
            response.status(422).json({message: 'A cor é obrigatória!'});
            return
        }

        if(images.length === 0){
            response.status(422).json({message: 'A imagem é obrigatória!'});
            return
        }


        // get pet owner:
        const token = getToken(request);
        const user = await getUserByToken(token);

        // Create a pet:
        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        })

        // Receiving an image array for the pet:
        images.map((img) => {
            pet.images.push(img.filename)
        })

        try {
            const newPet = await pet.save();
            response.status(201).json({message: "Pet cadastrado com sucesso!", newPet})
        }
        catch(err) {
            response.status(500).json({message: err});
        }
    }

    // View all pets:
    static async getAll(request, response){

        const pets = await Pet.find().sort('-createdAt');
        response.status(200).json({pets: pets})

    }

    // See all pets registered by a user:
    static async getAllUserPets(request, response){

        // Get user from token:
        const token = getToken(request);
        const user = await getUserByToken(token);
        // Find pets for user id:
        const pets = await Pet.find({'user._id': user._id}).sort('-createdAt');
        response.status(200).json({pets});

    }


    // View all pets the user wants to adopt:
    static async getAllUserAdoptions(request, response){

        // Get user from token:
        const token = getToken(request);
        const user = await getUserByToken(token);
        // Find pets for adopter id:
        const pets =  await Pet.find({'adopter._id': user._id}).sort('-createdAt');
        response.status(200).json({pets});

    }


    static async getPetById(request, response){

        const id = request.params.id

        if(!ObjectId.isValid(id)){
            response.status(422).json({
                message: 'Id inválido!'
            })
            return
        }

        // Checking if pet exists for id:
        const pet = await Pet.findOne({_id: id})

        if(!pet){
            response.status(404).json({message: 'Pet não encontrado!'})
        }

        response.status(200).json({pet: pet})
    }

    // Removing a pet:
    static async removePetById(request, response){

        const id = request.params.id
        // Checking Pet ID:
        if(!ObjectId.isValid(id)){
            response.status(422).json({
                message: 'Id inválido!'
            })
            return
        }

        // Checking if pet exists for id:
        const pet = await Pet.findOne({_id: id})

        if(!pet){
            response.status(404).json({message: 'Pet não encontrado!'})
            return
        }

        // Checking if logged in user registered the pet:
        const token = getToken(request);
        const user = await getUserByToken(token);

        if(pet.user._id.toString() !== user._id.toString()){
            response.status(422).json({
                message: 'Houve algum problema no processamento da sua solicitação!'
            })
            return
        }

        await Pet.findByIdAndRemove(id)
        response.status(200).json({message: 'Pet removido com sucesso!'})
    }

    static async updatePet(request, response){

        const id = request.params.id

        const {name, age, weight, color, available} = request.body
        const images = request.files
        // Variable to updated data:
        const updatedData = {}


        // Check if pet exists:
        const pet = await Pet.findOne({_id: id})

        if(!pet){
            response.status(404).json({message: 'Pet não encontrado!'})
        }

        // Checking if logged in user registered the pet:
        const token = getToken(request);
        const user = await getUserByToken(token);

        if(pet.user._id.toString() != user._id.toString()){
            response.status(422).json({
                message: 'Houve algum problema no processamento da sua solicitação!'
            })
            return
        }

        // Validations:
        if(!name){
            response.status(422).json({message: 'O nome é obrigatório!'});
            return
        } else {
            updatedData.name = name
        }

        if(!age){
            response.status(422).json({message: 'A idade é obrigatória!'});
            return
        } else {
            updatedData.age = age
        }

        if(!weight){
            response.status(422).json({message: 'O peso é obrigatório!'});
            return
        } else {
            updatedData.weight = weight
        }

        if(!color){
            response.status(422).json({message: 'A cor é obrigatória!'});
            return
        } else {
            updatedData.color = color
        }

        if(images.length === 0){
            response.status(422).json({message: 'A imagem é obrigatória!'});
            return
        } else {
            updatedData.images = []
            images.map((img) => {
                updatedData.images.push(img.filename)
            })
        }

        await Pet.findByIdAndUpdate(id, updatedData);
        response.status(200).json({message: 'Pet atualizado com sucesso!'})
    }


    static async schedule(request, response){

        const id = request.params.id

        // Check if pet exists:
        const pet = await Pet.findOne({_id: id})

        if(!pet){
            response.status(404).json({message: 'Pet não encontrado!'})
        }

        // Check if user registered the pet:
        const token = getToken(request);
        const user = await getUserByToken(token);

        if(pet.user._id.equals(user._id)){
            response.status(422).json({
                message: 'Você não pode agendar uma visita para seu próprio pet!'
            })
            return
        }

        // Check if user has already scheduled a visit:
        if(pet.adopter){
            if(pet.adopter._id.equals(user._id)){
                response.status(422).json({
                    message: 'Você já agendou uma visita para este pet!'
                })
                return
            }
        }

        // Add user to pet:
        pet.adopter = {
            _id: user._id,
            name: user.name,
            image: user.image
        }

        await Pet.findByIdAndUpdate(id, pet);
        response.status(200).json({
            message: `A visita foi agendada com sucesso. Entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}`
        })
    }


    static async concludeAdoption(request, response){

        const id = request.params.id

         // Check if pet exists:
         const pet = await Pet.findOne({_id: id})

         if(!pet){
             response.status(404).json({message: 'Pet não encontrado!'})
         }

         // Checking if logged in user registered the pet:
        const token = getToken(request);
        const user = await getUserByToken(token);

        if(pet.user._id.toString() !== user._id.toString()){
            response.status(422).json({
                message: 'Houve algum problema no processamento da sua solicitação!'
            })
            return
        }


        pet.available = false

        await Pet.findByIdAndUpdate(id, pet)
        response.status(200).json({
            message: 'Parabéns! O ciclo de adoção foi concluído com sucesso.'
        })
    }
}