import styles from './InputSelectColorPet.module.css'

function InputSelectColorPet({text, name, options, handleOnChange, value}) {

    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select name={name} id={name} onChange={handleOnChange} value={value || ''}>
                <option>Selecione a cor do Pet</option>
                {options.map((option) => (
                    <option value={option} key={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )

}

export default InputSelectColorPet