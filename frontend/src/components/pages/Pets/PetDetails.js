import styles from './PetDetails.module.css'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../../../utils/api'
import useFlashMessage from '../../../hooks/useFlashMessage'


function PetDetails() {

    const [pet, setPet] = useState({})
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage()
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        api.get(`/pets/${id}`).then((response) => {
            setPet(response.data.pet)
        })
        
    }, [id])

    return (

        <>{pet.name && (
            <section className={styles.pet_details_container}>
                <div className={styles.pet_details_header}>
                    <h1>Conhecendo o Pet: {pet.name}</h1>
                    <p>Se tiver interesse, marque uma visita para conhecê-lo</p>
                </div>
                <div className={styles.pet_images}>
                    {pet.images.map((img, index) => (
                        <img src={`${process.env.REACT_APP_API}images/pets/${img}`} 
                        alt={pet.name} 
                        key={index}/>
                    ))}
                </div>
                <p>
                    <span>Peso:</span> {pet.weight} kg
                </p>
                <p>
                    <span>Idade:</span> {pet.age} anos
                </p>
                {token ? (
                    <button>Solicitar uma visita</button>
                ) : (
                    <p>Você precisa criar uma conta para agendar uma visita: 
                        <Link to="/register">Clique aqui para criar uma conta!</Link> É rápido e fácil!</p>
                )}
            </section>
        )}</>
    )
}

export default PetDetails