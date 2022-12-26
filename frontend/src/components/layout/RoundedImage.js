
import styles from './RoundedImage.module.css'

// Function upload to user image:
function RoundedImage({src, alt, width}) {

    return (
        <img  src={src} alt={alt} className={`${styles.rounded_image} ${styles[width]}`} />
    )

}

export default RoundedImage