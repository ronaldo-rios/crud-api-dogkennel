import styles from './Message.module.css'
import {useState, useEffect} from 'react'
import bus from '../../utils/bus'

/* Function combined with bus.js to show the flash message with 
a given time of 3 seconds and then disappear again: */

function Message() {
    const [message, setMessage] = useState('')
    const [type, setType] = useState('')
    const [visibility, setVisibility] = useState(false)

    useEffect(() => {
        bus.addListener('flash', ({message, type}) => {
            setVisibility(true)
            setMessage(message)
            setType(type)
            setTimeout(() => {
                setVisibility(false)
            }, 3000)
        })  
        
    }, [])

    return (
        visibility && (
            <div className={`${styles.message}  ${styles[type]}`}></div>
        )

    )

}

export default Message