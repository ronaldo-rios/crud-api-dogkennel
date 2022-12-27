import api from '../../utils/api'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from './Home.module.css'

function Home() {

    const [pets, setPets] = useState([])

    // Call pets of API to view:
    useEffect(() => {
        api.get('/pets').then((response) => {
            setPets(response.data.pets)
        })
    }, [])

    return (
        <section>
            <div className={styles.pet_home_header}>
                <h1>Adote Amor. Adote um Pet!</h1>
            </div>
            <div className={styles.pet_container}>
                {pets.length > 0 && 
                    pets.map((pet) => (
                        <div className={styles.pet_card}>
                            <div className={styles.pet_card_image} 
                            style={{backgroundImage: `url(${process.env.REACT_APP_API}images/pets/${pet.images[0]})`}}></div>
                            <h3>{pet.name}</h3>
                            <p>
                                <span>{`Peso: ${pet.weight} kg `}</span>
                            </p>
                            {pet.available ? (
                                <Link to={`/pets/${pet._id}`}>Mais Detalhes</Link>
                            ) : (
                                <p className={styles.adopted_text}>Adotado!</p>
                            )}
                        </div>
                    ))}
                {pets.length === 0 && (<p>Não há pets cadastrados ou disponíveis para adoção no momento</p>)}
            </div>
        </section>
    )
}

export default Home