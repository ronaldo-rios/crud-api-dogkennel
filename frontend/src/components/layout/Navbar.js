import { Link } from 'react-router-dom'
import Logo from '../../assets/img/logo-pet.jpg'
import styles from './Navbar.module.css'
import {Context} from '../../context/userContext'
import {useContext} from 'react'


function Navbar() {

    const {authenticated, logout} = useContext(Context)
 
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={Logo} alt="Logo Dog Kennel" className={styles.logo}></img>
                <h2>Dog Kennel</h2>
            </div>
            <ul>
                <li>
                    <Link to="/">Adotar</Link>
                </li>
                {authenticated ? (<><li onClick={logout}>Sair</li></>) : (<>
                <li>
                    <Link to="/login">Entrar</Link>
                </li>
                <li>
                    <Link to="/register">Cadastrar-se</Link>
                </li>
                </>)}
                
            </ul>
        </nav>
    )
}

export default Navbar