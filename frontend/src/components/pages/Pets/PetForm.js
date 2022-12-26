import styles from './AddPet.module.css'
import { useState } from 'react'
import Input from '../Auth/Input'
import InputSelectColorPet from '../Auth/InputSelectColorPet'

function PetForm({ handleSubmit, petData, btnText }) {

    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const colors = ['Branco', 'Preto', 'Caramelo', 'Malhado', 'Cinza']

    // Function to add pet images:
    function onFileChange(event) {
        setPreview(Array.from(event.target.files))
        setPet({ ...pet, images: event.target.files })
    }

    function handleChange(e) {
        setPet({ ...pet, [e.target.name]: e.target.value })
    }

    // Function to select pet color:
    function handleColor(aux) {
        setPet({ ...pet, color: aux.target.options[aux.target.selectedIndex].text })
    }

    //Submit method:
    function handleSubmit(event) {
        event.preventDefaut()

    }

    return (
        <form className={styles.addpet_container} onSubmit={handleSubmit}>

            <div className={styles.preview_pet_images}>
                {preview.length > 0 ? preview.map((image, index) =>
                    <img src={URL.createObjectURL(image)} alt={pet.name} key={`${pet.name}+${index}`} />
                ) : pet.images && pet.images.map((image, index) =>
                    <img src={`${process.env.REACT_APP_API}images/pets/${image}`} alt={pet.name} key={`${pet.name}+${index}`} />
                )
                }
            </div>
            <Input text="Imagens do Pet" type="file" name="images" handleOnChange={onFileChange} multiple={true} />

            <Input text="Nome do Pet" type="text" name="name"
                placeholder="Nome do Pet" handleOnChange={handleChange} value={pet.name || ''} />

            <Input text="Idade do Pet" type="text" name="age"
                placeholder="Digite a idade do Pet" handleOnChange={handleChange} value={pet.age || ''} />

            <Input text="Peso do Pet" type="number" name="weight"
                placeholder="Digite o peso do Pet" handleOnChange={handleChange} value={pet.weight || ''} />

            <InputSelectColorPet text="Selecione a cor do Pet"
                options={colors} name="color" handleOnChange={handleColor} value={pet.color || ''} />

            <input type="submit" value={btnText} />
        </form>
    )
}

export default PetForm