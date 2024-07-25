import React from 'react';
import styles from './home.module.css';
import background from '../../images/wp13335488.jpg';

function Home() {
  return (
    <div className={styles.wallpaper}>
      <div className={styles.background} style={{ backgroundImage: `url(${background})` }}>
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.content}>
        <h1>Welcome to Kortna</h1>
        <p>Your go-to source for the latest football news and league standings.</p>
        <p>Stay informed with football news and league tables. Whether you're a passionate fan or a casual follower, we bring you the most comprehensive coverage of the football world. Dive into detailed standings of your favorite leagues and keep track of your team's progress throughout the season.</p>
        <a href="/news" className={styles.ctaButton}>Explore News</a>
      </div>
    </div>
  );
}

export default Home;
