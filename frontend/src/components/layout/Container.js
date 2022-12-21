import styles from './Container.module.css'

function Container({children}) {

    return (
        /* With the {children} prop all child tags 
        of main are embraced and thus the contents 
        that main embraces will be displayed: */
        <main className={styles.container}>
            {children}
        </main>
    )
}

export default Container