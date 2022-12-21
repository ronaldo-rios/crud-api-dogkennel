import styles from './Footer.module.css'
import Logo from '../../assets/img/logo-footer.jpg'

function Footer() {

    return (
        <footer className={styles.footer}>
            <p>
                <span className="bold">Dog Kennel</span> &copy; 2022 - Desenvolvido por Ronaldo Rios Espíndola
            </p>
            <div>
            <img src={Logo} alt="Logo Dog Kennel" className={styles.logo}></img>
            </div>
        </footer>
    )
}

export default Footer