import styles from './AddPet.module.css'
import api from '../../../utils/api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from '../../../hooks/useFlashMessage'
import PetForm from './PetForm'

// Function to add a new pet:
function AddPet() {

    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate()

    async function registerPet(pet) {
        let msgType = 'sucess'

        // Constructing object to send backend:
        const formData = new FormData()
        const petFormData = await Object.keys(pet).forEach((key) => {

            if(key === 'images') {
                for(let i = 0; i < pet[key].length; i++){
                    formData.append('images', pet[key][i])
                }
            }
            else {
                formData.append(key, pet[key])
            }
        })

        formData.append('pet', petFormData)

        const data = await api.post('/pets/create', formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`, 'Content-Type':'multipart/form-data'
        }
        }).then((response) => {
            console.log(response.data)
            return response.data
        }).catch((error) => {
            console.log(error.data)
            msgType = 'error'
            return error.response.data
        }) 
           
        setFlashMessage(data.message, msgType)
        // If msgType = error, don't redirected:
        if(msgType !== 'error') {
            navigate('/pets/mypets')
        }
        
        
        
        
    }

    return (
        <section className={styles.addpet_header}>
            <h1>Cadastre um Pet</h1>
            <h4>Ele ficará disponível para adoção</h4>
            <div>
               <PetForm handleSubmit={registerPet} btnText="Cadastrar Pet"/>
            </div>
        </section>
    )
}

export default AddPet