import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './bar.module.css';
import logo from '../../images/logo-color.png';
import logo_premier from '../../images/images.png';
import logo_egyptian from '../../images/Egyptian_Premier_League_logo.png';
import logo_la_liga from '../../images/images (1).png';

function Bar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/home">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <ul className={styles.navList}>
        <li className={styles.navItem}><Link to="/home">Home</Link></li>
        <li className={styles.navItem}><Link to="/news">News</Link></li>
        <li className={styles.navItem} onClick={handleDropdownToggle}>
          <span>Leagues</span>
          {isDropdownOpen && (
            <ul className={styles.dropdown}>
              <li><img src={logo_premier} alt="Premier League Logo" /><Link to="/leagues/premier">Premier League</Link></li>
              <li><img src={logo_egyptian} alt="Egyptian League Logo" /><Link to="/leagues/egyptian">Egyptian League</Link></li>
              <li><img src={logo_la_liga} alt="La Liga Logo" /><Link to="/leagues/liga">La Liga</Link></li>
            </ul>
          )}
        </li>
        <li className={styles.navItem}><Link to="/quiz">Quizzes</Link></li>
      </ul>
    </nav>
  );
}

export default Bar;
