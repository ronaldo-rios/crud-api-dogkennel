
const Pet = require('../models/Pet');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

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
}