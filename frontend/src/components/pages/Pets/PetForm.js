import styles from './AddPet.module.css'
import { useState } from 'react'
import Input from '../Auth/Input'
import InputSelectColorPet from '../Auth/InputSelectColorPet'

function PetForm({ handleSubmit, petData, btnText }) {

    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const colors = ['Branco', 'Preto', 'Caramelo', 'Malhado', 'Cinza']

    function onFileChange(event) {
        setPreview(event.target.files[0])
        setPet({ ...pet, [event.target.name]: event.target.files[0] })
    }

    function handleChange(e) {

    }

    function handleColor(aux) {

    }

    return (
        <section className={styles.addpet_container}>
            <Input text="Imagens do Pet" type="file" name="images" handleOnChange={onFileChange} multiple={true} />

            <Input text="Nome do Pet" type="text" name="name"
                placeholder="Nome do Pet" handleOnChange={handleChange} value={pet.name || ''} />

            <Input text="Idade do Pet" type="text" name="age"
                placeholder="Digite a idade do Pet" handleOnChange={handleChange} value={pet.age || ''} />

            <Input text="Peso do Pet" type="number" name="weight"
                placeholder="Digite o peso do Pet" handleOnChange={handleChange} value={pet.weight || ''} />

            <InputSelectColorPet text="Selecione a cor do Pet"
                options={colors} name="color" handleOnChange={handleColor} value={pet.color || ''}/>

            <input type="submit" value={btnText} />
        </section>
    )
}

export default PetForm