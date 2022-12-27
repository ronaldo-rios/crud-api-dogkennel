import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RoundedImage from '../../layout/RoundedImage'
import useFlashMessage from '../../../hooks/useFlashMessage'
import api from '../../../utils/api'
import styles from './Dashboard.module.css'

// Router and function to view all user pets created:
function MyPets() {

    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()

    // Call api route to see my pets:
    useEffect(() => {
        api.get('/pets/mypets', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setPets(response.data.pets)
        })
    }, [token])



    // async function to delete a pet:
    async function removePet(id) {

        let msgType = 'sucess'

        const data = await api.delete(`pets/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            const updatedPets = pets.filter((pet) => pet._id !== id)
            setPets(updatedPets)
            return response.data
        }).catch((error) => {
            msgType = 'error'
            return error.response.data
        })

        setFlashMessage(data.message, msgType)
    }

    return (
        <section>
            <div className={styles.petslist_header}>
                <h1>Meus Pets Cadastrados</h1>
                <Link to="/pets/add">Cadastrar Pet</Link>
            </div>

            <div className={styles.petslist_container}>
                {pets.length > 0 && (
                    pets.map((pet) => (
                        <div key={pet._id} className={styles.petlist_row}>
                            <RoundedImage
                                src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                                alt={pet.name}
                                width="px75"
                            />
                            <span>{pet.name}</span>
                            <div className={styles.actions}>
                            {pet.available ? (
                                <>
                                    {pet.adopter && (<button className={styles.conclude_btn}>Concluir adoção</button>)}
                                    <Link to={`/pets/edit/${pet._id}`}>Editar</Link>
                                    <button onClick={() => {removePet(pet._id)}}>Remover</button>
                                </>) : (
                                <><p>Pet já adotado</p></>
                            )}
                            </div>

                        </div>
                    ))
                )}
                {pets.length === 0 && <p> Não há pets cadastrados</p>}
            </div>
        </section>
    )
}

export default MyPets