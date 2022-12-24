import { useState, useContext } from 'react'
import Input from './Input'
import { Link } from 'react-router-dom'
import styles from './Form.module.css'
import { Context } from '../../../context/UserContext'

function Login() {

    const [user, setUser] = useState({})
    const {login} = useContext(Context)

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function handleSubmit(event) {
        event.preventDefault()
        // Send user to Database:
        login(user)
    }

    return (
        <section className={styles.form_container}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input text="E-mail" type="email" name="email"
                    placeholder="Digite seu e-mail" handleOnChange={handleChange} />

                <Input text="Senha" type="password" name="password"
                    placeholder="Digite a sua senha" handleOnChange={handleChange} />

                <input type="submit" value="Entrar" />
            </form>
            <p>Ainda não tem conta? <Link to="/register">Clique aqui</Link></p>
        </section>
    )
}

export default Login