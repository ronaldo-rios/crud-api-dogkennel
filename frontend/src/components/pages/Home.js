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
            <div>
                <h1>Adote Amor. Adote um Pet!</h1>
            </div>
        </section>
    )
}

export default Home