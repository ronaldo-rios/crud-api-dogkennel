import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RoundedImage from '../../layout/RoundedImage'
import useFlashMessage from '../../../hooks/useFlashMessage'
import api from '../../../utils/api'
import styles from './Dashboard.module.css'

// Router and fnction to view all user pets:
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

    return (
        <section>
            <div>
                <h1>MyPets</h1>
                <Link to="/pets/add">Cadastrar Pet</Link>
            </div>

            <div>
                {pets.length > 0 && (
                    pets.map((pet) => (
                        <div key={pet._id}>
                            <RoundedImage
                                src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                                alt={pet.name}
                                width="px75"
                            />
                            <span>{pet.name}</span>
                            <div className={styles.actions}></div>

                            {pet.available ? (
                                <>
                                    {pet.adopter && (<button>Concluir adoção</button>)}
                                    <Link to={`/pets/edit/${pet._id}`}>Editar</Link>
                                    <button>Remover</button>
                                </>) : (
                                <><p>Pet já adotado</p></>
                            )}
                        </div>
                    ))
                )}
                {pets.length === 0 && <p> Não há pets cadastrados</p>}
            </div>
        </section>
    )
}

export default MyPets