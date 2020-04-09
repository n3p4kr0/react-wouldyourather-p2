import React from 'react'
import styles from './css/notFoundPage.module.css'

function NotFoundPage(props) {
    return (
        <div className={styles.notFoundPage}>
            <h2>404 Not Found</h2>
            <p>The requested resource does not exist.</p>
            <a href='/'>Back to home page.</a>
        </div>
    )
}

export default NotFoundPage