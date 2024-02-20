import React from 'react'
import styles from './Header.module.css'

function Header() {
    return (
        <div className={styles.container}>
            <p className={styles.heading}>
                A <span>Resume</span> that stands out!
            </p>
            <p className={styles.heading}>
                Make your own resume. <span>It's free</span>
            </p>
        </div>
    )
}

export default Header;