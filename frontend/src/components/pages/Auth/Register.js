import Input from './Input'
import styles from './Form.module.css'
import {Link} from 'react-router-dom'

function Register() {

    function handleChange(event) {

    }


    return (
        <section className={styles.form_container}>
            <h1>Registrar</h1>

            <form>
                <Input text="Nome" type="text" name="name"
                    placeholder="Digite o seu nome" handleOnChange={handleChange} />

                <Input text="Telefone" type="tel" name="phone"
                    placeholder="Digite o seu telefone" handleOnChange={handleChange} />

                <Input text="E-mail" type="email" name="email"
                    placeholder="Digite o seu melhor e-mail" handleOnChange={handleChange} />

                <Input text="Senha" type="password" name="password"
                    placeholder="Digite a sua senha" handleOnChange={handleChange} />

                <Input text="Confirmar Senha" type="password" name="confirmpassword"
                    placeholder="Digite novamente a sua senha" handleOnChange={handleChange} />

                <input type="submit" value="Cadastrar" />
            </form>
            <p>Já tem conta? <Link to="/login">Clique aqui</Link></p>
        </section>
    )
}

export default Register