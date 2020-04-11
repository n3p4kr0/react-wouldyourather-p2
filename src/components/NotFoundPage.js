import React from 'react'
import { Link } from 'react-router-dom'
import styles from './css/notFoundPage.module.css'

function NotFoundPage(props) {
    return (
        <div className={styles.notFoundPage}>
            <h2>404 Not Found</h2>
            <p>The requested resource does not exist.</p>
            <Link to ='/'>Back to home page.</Link>
        </div>
    )
}

export default NotFoundPage