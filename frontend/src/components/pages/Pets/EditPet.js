import api from '../../../utils/api'
import { useState, useEffect } from 'react'
import styles from './AddPet.module.css'
import PetForm from './PetForm'
import useFlashMessage from '../../../hooks/useFlashMessage'
import { useParams } from 'react-router-dom'

// This part of function 
// have focus in visualization and call 
// pets cadastreds available to edition:
function EditPet() {

    const [pet, setPet] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage()

    // Call the pet and put it in the view:
    useEffect(() => {
        api.get(`/pets/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setPet(response.data.pet)
        })
    }, [token, id])


    // This function make the actions to update pet data:
    async function updatePet(pet) {

        let msgType = 'sucess'

        const formData = new FormData()
        await Object.keys(pet).forEach((key) => {

            if(key === 'images'){
                for(let i = 0; i < pet[key].length; i++) {
                    formData.append('images', pet[key][i])
                }
            }
            else{
                formData.append(key, pet[key])
            }
            
        })

        //Requisition:
        const data = await api.patch(`/pets/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`, 'Content-Type':'multipart/form-data'
            }
        }).then((response) => {
            return response.data
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)

    }


    return (
        <section>
            <div className={styles.addpet_header}>
            <h1>Editando o Pet: {pet.name}</h1>
            </div>

            {/* If the request was successful, the pets form is rendered. */}
            {pet.name && (<PetForm handleSubmit={updatePet} btnText="Atualizar" petData={pet} />)}
        </section>
    )
}

export default EditPet