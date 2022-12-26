import styles from './AddPet.module.css'
import api from '../../../utils/api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from '../../../hooks/useFlashMessage'
import PetForm from './PetForm'

// Function to add a new pet:
function AddPet() {

    return (
        <section className={styles.addpet_header}>
            <div>
               <PetForm btnText="Cadastrar Pet"/>
            </div>
        </section>
    )
}

export default AddPet