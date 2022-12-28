import styles from './Dashboard.module.css'
import api from '../../../utils/api'
import { useState, useEffect } from 'react'
import RoundedImage from '../../layout/RoundedImage'

// Call my adoptions wait in API:
function MyAdoptions() {

    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        api.get('/pets/myadoptions', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setPets(response.data.pets)
        })
    }, [token])

    return (
        <section>
            <div className={styles.petslist_header}>
                <h1>Minhas Adoções</h1>
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
                            
                            <div className={styles.contacts}>
                                <p><span>Ligue para:</span> {pet.user.phone}</p>
                                <p><span>Fale com:</span> {pet.user.name}</p>
                            </div>
                            <div className={styles.actions}>
                            {pet.available ? (
                                <>
                                   <p>Adoção em processo!</p>
                                </>) : (
                                <><p>Parabéns por concluir a adoção!</p></>
                            )}
                            </div>
                            
                        </div>
                    ))
                )}
                {pets.length === 0 && (
                    <p>Ainda não há adoções de Pets</p>
                )}
            </div>
        </section>
    )


}

export default MyAdoptions