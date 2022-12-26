import { useState, useEffect } from  'react'
import { Link } from 'react-router-dom'

// Router and fnction to view all user pets:
function MyPets() {

    const [pets, setPets] = useState([])

    return (
        <section>
            <div>   
                <h1>MyPets</h1>
                <Link to="/pets/add">Cadastrar Pet</Link>
            </div>
            
            <div> 
                {pets.length > 0 && (
                    <p> Meus pets cadastrados</p>
                )}
                {pets.length === 0 && <p> Não há pets cadastrados</p>}
            </div>
        </section>
    )
}

export default MyPets