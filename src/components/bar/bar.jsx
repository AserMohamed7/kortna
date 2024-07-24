import React from 'react';
import { Link } from 'react-router-dom';
import styles from './bar.module.css';
import logo from '../../images/logo-color.png';

function Bar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
      </div>
      <ul className={styles.navList}>
        <li className={styles.navItem}><Link to="/home">Home</Link></li>
        <li className={styles.navItem}><Link to="/news">News</Link></li>
        <li className={styles.navItem}><Link to="/">Leagues</Link></li>
        <li className={styles.navItem}><Link to="/quiz">Quizzes</Link></li>
      </ul>
    </nav>
  );
}

export default Bar;
